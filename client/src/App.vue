<template>
  <div class="app-container">
    <h1>🏗️ Building Planner App</h1>
    <div class="toolbar">
      <select v-model="currentTool">
        <option value="circle">Circle</option>
        <option value="rect">Rectangle</option>
        <option value="line">Line</option>
        <option value="select">Select/Move</option>
      </select>
      <input v-model="annotation" placeholder="Enter annotation" />
    </div>
    <canvas
      ref="canvas"
      width="800"
      height="500"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="endDrawing"
      @mouseout="endDrawing"
    ></canvas>
    <div class="buttons">
      <button class="btn" @click="saveDrawing">💾 Save Drawing</button>
      <input v-model="loadId" placeholder="Enter ID to Load" />
      <button class="btn" @click="loadDrawing">📂 Load Drawing</button>
      <button class="btn delete" @click="deleteLastShape">❌ Delete Last Shape</button>
      <button class="btn delete" @click="deleteSelectedShape">🗑️ Delete Selected Shape</button>
      <button class="btn" @click="downloadAsImage">⬇️ Download as Image</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const canvas = ref(null);
const ctx = ref(null);
const currentTool = ref('circle');
const shapes = ref([]);
const drawing = ref(false);
const startX = ref(0);
const startY = ref(0);
const annotation = ref('');
const selectedShape = ref(null);
const loadId = ref('');

onMounted(() => {
  const canvasEl = canvas.value;
  ctx.value = canvasEl.getContext('2d');
  redraw();
});

const startDrawing = (e) => {
  const rect = canvas.value.getBoundingClientRect();
  startX.value = e.clientX - rect.left;
  startY.value = e.clientY - rect.top;

  if (currentTool.value === 'select') {
    selectedShape.value = getShapeAt(startX.value, startY.value);
  } else {
    drawing.value = true;
  }
};

const draw = (e) => {
  if (!drawing.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  redraw();

  ctx.value.strokeStyle = 'black';
  ctx.value.lineWidth = 2;

  if (currentTool.value === 'circle') {
    const radius = Math.sqrt(
      Math.pow(mouseX - startX.value, 2) + Math.pow(mouseY - startY.value, 2)
    );
    ctx.value.beginPath();
    ctx.value.arc(startX.value, startY.value, radius, 0, 2 * Math.PI);
    ctx.value.stroke();
  } else if (currentTool.value === 'rect') {
    const width = mouseX - startX.value;
    const height = mouseY - startY.value;
    ctx.value.strokeRect(startX.value, startY.value, width, height);
  } else if (currentTool.value === 'line') {
    ctx.value.beginPath();
    ctx.value.moveTo(startX.value, startY.value);
    ctx.value.lineTo(mouseX, mouseY);
    ctx.value.stroke();
  }
};

const endDrawing = (e) => {
  if (!drawing.value) return;
  drawing.value = false;

  const rect = canvas.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const shape = {
    type: currentTool.value,
    startX: startX.value,
    startY: startY.value,
    endX: mouseX,
    endY: mouseY,
    annotation: annotation.value,
  };

  shapes.value.push(shape);
  annotation.value = '';
  redraw();
};

const redraw = () => {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  shapes.value.forEach((shape) => {
    ctx.value.strokeStyle = 'black';
    ctx.value.lineWidth = 2;
    if (shape.type === 'circle') {
      const radius = Math.sqrt(
        Math.pow(shape.endX - shape.startX, 2) +
          Math.pow(shape.endY - shape.startY, 2)
      );
      ctx.value.beginPath();
      ctx.value.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
      ctx.value.stroke();
      ctx.value.fillText(shape.annotation, shape.startX, shape.startY);
    } else if (shape.type === 'rect') {
      const width = shape.endX - shape.startX;
      const height = shape.endY - shape.startY;
      ctx.value.strokeRect(shape.startX, shape.startY, width, height);
      ctx.value.fillText(shape.annotation, shape.startX, shape.startY);
    } else if (shape.type === 'line') {
      ctx.value.beginPath();
      ctx.value.moveTo(shape.startX, shape.startY);
      ctx.value.lineTo(shape.endX, shape.endY);
      ctx.value.stroke();
      ctx.value.fillText(shape.annotation, shape.startX, shape.startY);
    }
  });
};

const getShapeAt = (x, y) => {
  for (let i = shapes.value.length - 1; i >= 0; i--) {
    const shape = shapes.value[i];
    if (shape.type === 'rect') {
      const minX = Math.min(shape.startX, shape.endX);
      const maxX = Math.max(shape.startX, shape.endX);
      const minY = Math.min(shape.startY, shape.endY);
      const maxY = Math.max(shape.startY, shape.endY);
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) return i;
    } else if (shape.type === 'circle') {
      const radius = Math.sqrt(
        Math.pow(shape.endX - shape.startX, 2) +
          Math.pow(shape.endY - shape.startY, 2)
      );
      const dist = Math.sqrt(
        Math.pow(x - shape.startX, 2) + Math.pow(y - shape.startY, 2)
      );
      if (dist <= radius) return i;
    } else if (shape.type === 'line') {
      const dist = Math.abs(
        (shape.endY - shape.startY) * x -
          (shape.endX - shape.startX) * y +
          shape.endX * shape.startY -
          shape.endY * shape.startX
      ) /
      Math.sqrt(
        Math.pow(shape.endY - shape.startY, 2) +
          Math.pow(shape.endX - shape.startX, 2)
      );
      if (dist <= 5) return i;
    }
  }
  return null;
};

const deleteLastShape = () => {
  if (shapes.value.length > 0) {
    shapes.value.pop();
    redraw();
  } else {
    alert("No shapes to delete!");
  }
};

const deleteSelectedShape = () => {
  if (selectedShape.value !== null) {
    shapes.value.splice(selectedShape.value, 1);
    selectedShape.value = null;
    redraw();
  } else {
    alert("No shape selected!");
  }
};

const saveDrawing = async () => {
  try {
    const response = await axios.post('http://localhost:3000/save', { shapes: shapes.value });
    alert('Drawing saved with ID: ' + response.data.id);
  } catch (error) {
    console.error(error);
    alert('Error saving drawing');
  }
};

const loadDrawing = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/load/${loadId.value}`);
    shapes.value = response.data.shapes;
    redraw();
  } catch (error) {
    console.error(error);
    alert('Error loading drawing');
  }
};

const downloadAsImage = () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.value.toDataURL();
  link.click();
};
</script>

<style scoped>
.app-container {
  text-align: center;
  background: linear-gradient(to right, #d7e1ec, #f5f7fa);
  padding: 20px;
  border-radius: 10px;
}

canvas {
  background: #fff;
  border: 2px solid #ccc;
  margin-top: 10px;
}

.toolbar {
  margin-bottom: 10px;
}

input, select {
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}

.buttons {
  margin-top: 15px;
}

.btn {
  background: green;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin: 5px;
}

.btn.delete {
  background: #dc3545;
}

.btn:hover {
  opacity: 0.8;
}
</style>
