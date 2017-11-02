<template>
    <div class="list-container">
        <input type="text" v-model="newItem">
        <button @click="addNewItem">Add</button>
        <ul class="list">
            <li v-for="item in list">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                newItem: ''
            }
        },

        beforeMount() {
            this.list = ['eat some food', 'sleep']
        },

        methods: {
            addNewItem() {
                this.list.push(this.newItem)
                this.newItem = ''
            }
        }
    }
</script>