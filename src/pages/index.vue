<template>
  <div>
    <div style="margin-bottom: 30px;">
      <input
        v-model="title"
        type="text"
        placeholder="タイトル"
        style="margin-bottom: 5px;"
      >
      <textarea
        v-model="description"
        placeholder="詳細説明"
        style="margin-bottom: 10px;"
      />
      <div>
        <button
          type="submit"
          :disabled="loading || id !==''"
          @click="createTask"
        >
          新規作成
        </button>
        <button
          type="submit"
          style="margin-left: 10px;"
          :disabled="loading || id ==''"
          @click="updateTask"
        >
          更新
        </button>
      </div>
    </div>
    <table>
      <tr>
        <th width="50" />
        <th width="50">
          STATUS
        </th>
        <th width="200">
          ID
        </th>
        <th width="200">
          TITLE
        </th>
        <th width="300">
          DESCRIPTION
        </th>
        <th width="60" />
      </tr>
      <tr
        v-for="task in tasks"
        :key="task.id"
      >
        <td>
          <input
            id="box1"
            v-model="task.task_status"
            type="checkbox"
            :disabled="loading"
            @change="completeTask(task)"
          >
        </td>
        <td>
          <template v-if="task.task_status">
            完了
          </template>
        </td>
        <td>{{ task.id }}</td>
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>
          <button
            type="submit"
            class="small outlined"
            :disabled="loading"
            @click="editTask(task)"
          >
            編集
          </button>
          <button
            type="submit"
            class="delete small"
            :disabled="loading"
            @click="deleteTask(task.id)"
          >
            削除
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  ALL_TASKS,
  CREATE_TASK,
  PUBLISH_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from '~/constants/task';

interface task {
  id: string,
  title: string
  description: string
  task_status: boolean
}

interface Data {
  tasks: task[],
  id: string
  title: string
  description: string
  taskStatus: boolean
  loading: boolean
}

export default defineComponent({
  name: 'TodoList',
  data(): Data {
    return {
      tasks: [],
      title: '',
      id: '',
      description: '',
      taskStatus: false,
      loading: false,
    };
  },
  apollo: {
    tasks: ALL_TASKS,
  },
  methods: {
    // --------------------------------
    // 新規作成
    // --------------------------------
    createTask: function() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CREATE_TASK,
        variables: {
          title: this.title,
          description: this.description,
          task_status: false,
        },
      }).then(() => {
        this.publish();
      }).catch((error) => {
        console.error(error);
        this.loading = false;
      });
    },
    // --------------------------------
    // 削除
    // --------------------------------
    deleteTask: function(id: unknown) {
      this.loading = true;
      this.$apollo.mutate({
        mutation: DELETE_TASK,
        variables: {
          id: id,
        },
      }).then(() => {
        this.dataReacquisition();
      }).catch((error) => {
        console.error(error);
        this.loading = false;
      });
    },
    // --------------------------------
    // 更新
    // --------------------------------
    editTask(selectData: task) {
      this.id = selectData.id;
      this.title = selectData.title;
      this.description = selectData.description;
      this.taskStatus = selectData.task_status;
    },
    updateTask: function() {
      this.loading = true;
      this.$apollo.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: this.id,
          title: this.title,
          description: this.description,
          task_status: this.taskStatus,
        },
      }).then(() => {
        this.clearData();
        this.publish();
      }).catch((error) => {
        console.error(error);
        this.loading = false;
      });
    },
    completeTask: function(selectData: task) {
      this.loading = true;
      this.$apollo.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: selectData.id,
          title: selectData.title,
          description: selectData.description,
          task_status: !selectData.task_status,
        },
      }).then(() => {
        this.publish();
      }).catch((error) => {
        console.error(error);
        this.loading = false;
      });
    },
    // --------------------------------
    // 公開
    // --------------------------------
    publish() {
      this.$apollo.mutate({
        mutation: PUBLISH_TASK,
      }).then(() => {
        this.dataReacquisition();
      }).catch((error) => {
        console.error(error);
        this.loading = false;
      });
    },
    // --------------------------------
    // データ再取得
    // --------------------------------
    async dataReacquisition() {
      await this.$apollo.queries.tasks.fetchMore({
        updateQuery: (previousResult, {fetchMoreResult}) => {
          return {
            tasks: fetchMoreResult.tasks,
          };
        },
      });
      this.loading = false;
    },
    // --------------------------------
    // リセット
    // --------------------------------
    clearData() {
      this.id = '';
      this.title = '';
      this.description = '';
      this.taskStatus = false;
    },
  },
});
</script>
