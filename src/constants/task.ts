/* eslint-disable max-len */
import gql from "graphql-tag";

// 全件取得
export const ALL_TASKS = gql`
  query allTasks {
    tasks(orderBy: createdAt_DESC) {
      id
      title
      description
      task_status
    }
  }
`;

// 新規追加
export const CREATE_TASK = gql`
  mutation createTask(
    $title: String
    $description: String
    $task_status: Boolean
  ) {
    createTask(
      data: {
        title: $title
        description: $description
        task_status: $task_status
      }
    ) {
      id
      title
      description
      task_status
      stage
    }
  }
`;

// 更新
export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: ID
    $title: String
    $description: String
    $task_status: Boolean
  ) {
    updateTask(
      data: {
        title: $title
        description: $description
        task_status: $task_status
      }
      where: { id: $id }
    ) {
      id
      title
      description
      task_status
    }
  }
`;

// 削除
export const DELETE_TASK = gql`
  mutation deleteTask($id: ID) {
    deleteTask(where: { id: $id }) {
      id
    }
  }
`;

// 公開
export const PUBLISH_TASK = gql`
  mutation publishTask {
    publishManyTasks(to: PUBLISHED) {
      count
    }
  }
`;
