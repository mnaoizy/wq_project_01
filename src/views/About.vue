<template>
<div class="results-container">
  <ul class="results">
    <li v-for="user in users" class="result-item">
      <h2>名前: {{JSON.parse(user.name).name||'not entered'}}</h2>
      <h2>日時: {{$moment(JSON.parse(user.name).time).format('llll')}}</h2>
      <h2>予備実験</h2>
      <table>
        <tr>
          <th>順番</th>
          <th>モデル音声</th>
          <th>選択</th>
          <th>反応時間</th>
        </tr>
        <tr v-for="(data, key) in JSON.parse(user.name).preTestResult" :key="key">
          <td>{{data['Index']}}</td>
          <td>{{data['Model Audio'].replace('.wav', '')}}</td>
          <td>{{data['User Selected']}}</td>
          <td>{{data['Response Time']}}</td>
        </tr>
      </table>
      <h2>本実験</h2>
      <table>
        <tr>
          <th>順番</th>
          <th>モデル音声</th>
          <th>選択</th>
          <th>反応時間</th>
        </tr>
        <tr v-for="(data, key) in JSON.parse(user.name).mainTestResult" :key="key">
          <td>{{data['Index']}}</td>
          <td>{{data['Model Audio'].replace('.wav', '')}}</td>
          <td>{{data['User Selected']}}</td>
          <td>{{data['Response Time']}}</td>
        </tr>
      </table>
      <button @click="deleteUser(user._id)">Delete this item</button>
    </li>
  </ul>
</div>
</template>

<script>


export default { 
    data(){
      return {
        users: [],
        input: {
          name: '',
          age: ''
        },
        message: '',
      }
    },
    methods: {
      fetchUsers(){
        this.$apiService.get('users').then((item)=>{
          this.users = item
        })
      },
      addUser(){
        this.$apiService.add('users', this.input).then((e)=>{
          this.fetchUsers()
          console.log(e)
        }).catch((e)=>{
          console.log(e)
          this.message = e
        })
      },
      deleteUser(user_id){
        this.$apiService.delete('users', user_id).then(()=>{
          this.fetchUsers()
        })
      }
    },
    mounted(){
      this.fetchUsers()
    }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

table {
  text-align: center;
}

.results-container {

}
.results {
  h2 {
    font-size: 1.4rem;
    text-align: left;
    margin: 25px 0 3px 0;
  }
  color: #333;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: flex-end;
  .result-item {
    display: inline-block;
    margin: 20px;
    background-color: white;
    padding: 20px 30px;
    border-radius: 10px;
    text-align: center;
    table {
      width: 100%;
      border-top: 2px solid #555;
      border-bottom: 2px solid #555;
      padding: 5px 0;
    }
    button {
      margin: 20px 0;
    }
  }
}

button {
  display: inline-block;
  padding: 10px 20px;
  margin: 30px 0 10px 0 !important;
  font-weight: bold;
  color: #555;
  background: white;
  border: 1px solid #f88; 
  cursor: pointer;
    &:hover {
    border: 1px solid #f88;
    background-color: #f88;
    color: white; 
    transform: scale(1.1);
  }
}
</style>
