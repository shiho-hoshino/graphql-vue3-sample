<template>
  <div>
    <table>
      <tr>
        <th width="200">
          ID
        </th>
        <th width="200">
          TITLE
        </th>
        <th width="300">
          DESCRIPTION
        </th>
        <th width="100">
          STATUS
        </th>
      </tr>
      <tr
        v-for="task in tasks"
        :key="task.id"
      >
        <td>{{ task.id }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>{{ task.task_status }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  ALL_TASKS,
} from '~/constants/task';

interface task {
  id: string,
  title: string
  description: string
  task_status: boolean
}

interface Data {
  tasks: task[],
}

export default defineComponent({
  name: 'TodoList',
  data(): Data {
    return {
      tasks: [],
    };
  },
  apollo: {
    tasks: ALL_TASKS,
  },
});
</script>
