<template>
  <div id="app" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-lg p-4">
          <h1 class="text-center mb-4">{{ title }}</h1>

          <div class="mb-3">
            <span class="badge bg-primary p-2"> คุณมีสิ่งที่ต้องทำ {{ allTasks }} {{ allTasks > 1 ? 'tasks' : 'task' }} </span>
            <input
              type="text"
              v-model="newTask"
              class="form-control mt-2"
              placeholder="Add a new task"
              @keyup.enter="addTask"
            />
          </div>

          <!-- แสดง preview ถ้ามีข้อความใน newTask -->
          <div v-if="newTask.length > 0" class="alert alert-info">
            <h6>New task preview</h6>
            <p>{{ newTask }}</p>
          </div>

          <button @click="addTask" class="btn btn-success w-100 mb-3" :disabled="newTask.length < 1">
            ➕ Add Task
          </button>

          <ul class="list-group">
            <li v-for="task in latest" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
              <div v-if="task.edit" class="d-flex w-100">
                <input type="text" v-model="task.name" class="form-control me-2" />
                <button @click="saveEdit(task)" class="btn btn-primary">💾 Save</button>
              </div>
              
              <div v-else class="w-100 d-flex justify-content-between">
                <span :class="{ 'text-decoration-line-through': task.finished }">
                  {{ task.name }} - {{ task.finished ? '✅ สำเร็จ' : '❌ ยังไม่เสร็จ' }}
                </span>
                <div>
                  <button @click="toggleEdit(task)" class="btn btn-warning btn-sm me-2">✏️ Edit</button>
                  <button @click="deleteTask(task.id)" class="btn btn-danger btn-sm">🗑️ Delete</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const title = ref("📝 My TO-DO List")
const newTask = ref("")
const tasks = ref([])

// โหลด Task จาก LocalStorage
const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks")
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
}

// บันทึก Task ลง LocalStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
}

// เพิ่ม Task ใหม่
const addTask = () => {
  if (newTask.value.length < 1) return

  tasks.value.push({
    id: Date.now(),
    name: newTask.value,
    finished: false,
    edit: false
  })

  newTask.value = "" // เคลียร์ input
  saveTasks()
}

// ลบ Task
const deleteTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
  saveTasks()
}

// เปิดโหมดแก้ไข
const toggleEdit = (task) => {
  task.edit = true
}

// บันทึก Task ที่แก้ไข
const saveEdit = (task) => {
  task.edit = false
  saveTasks()
}

// นับจำนวน Tasks
const allTasks = computed(() => tasks.value.length)

// ให้ Task ล่าสุดอยู่ด้านบน
const latest = computed(() => [...tasks.value].reverse())

// โหลด Task เมื่อเปิดหน้าเว็บ
onMounted(() => {
  loadTasks()
})
</script>

<style>
#app {
  font-family: "Arial", sans-serif;
  color: #2c3e50;
}
</style>
