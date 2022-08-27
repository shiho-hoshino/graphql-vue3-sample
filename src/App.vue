<template>
  <router-view />
</template>
<style>
table{
  width: 100%;
  border-spacing: 0;
}

table th{
  border-bottom: solid 2px #ccc;
  padding: 10px 0;
}

table td{
  border-bottom: solid 1px #ddd;
  text-align: center;
  padding: 5px 0;
}

input[type="text"] {
  width: 100%;
}

textarea {
  width: 100%;
}

button {
    display: inline-block;
    width: 100%;
    max-width: 100px;
    margin: auto;
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    background-color: #269dff;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    border: 2px solid transparent;
}
button:hover {
  opacity: 0.5;
}
button.small {
  padding: 2px 4px;
  font-size: 10px;
}
button:disabled {
  background-color: #bababa;
  cursor: default;
  opacity: 1;
}
button.outlined:not(:disabled) {
  background-color: #fff;
  border: 1px solid #fb4444;
  color: #fb4444;
}
button.delete:not(:disabled) {
  background-color: #fb4444;
}
button.complete:not(:disabled) {
  background-color: #00b209;
}
</style>