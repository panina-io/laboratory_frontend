<template>
    <div>
    <h1 class="section-name">
        Модели холодильников
        <button class="add-item" @click="Add">
            +Добавить
        </button>
    </h1>
    <refrigerator-models-add-form v-if="add_mode" @cancel_add="cancel_add" @add_item="add_item"/>
    <table class="components-list">
    <thead>
        <tr class="table-header">
            <th class="head">
                Модель
            </th>
            <th class="head">
                Примечание
            </th>
          </tr>
        </thead>
        <refrigerator-models-component
                v-for="item in items"
                    :id="item.id"
                    :name="item.name"
                    :note="item.note"
                    @edit_item="edit_item"
                    @delete_item="delete_item"/>
        </table>
</div>
</template>

<script>
import RefrigeratorModelsComponent from './RefrigeratorModelsComponent.vue';
import RefrigeratorModelsAddForm from './RefrigeratorModelsAddForm.vue';

    export default{
        components: {
            RefrigeratorModelsComponent, 
            RefrigeratorModelsAddForm
        },
        data(){
            return {
                items: [],
                add_mode: false
            }
        },
        methods: {
            async getData(){
                try{
                    const response = await this.$http.get("refrigerator_models/", {headers: {authorization: `Bearer ${localStorage.access_token}`}})
                    this.items = response.data
                }
                catch(error){
                    console.log(error)
                }
            },
            async editData(id, name, note){
                try{
                    await this.$http.put("refrigerator_models/"+id+"/",{
                        name: name, note: note}, {headers: {
                        authorization: `Bearer ${localStorage.access_token}`
                    }})
                }
                catch(error){
                    console.log(error)
                }
            },
            async addData(name, note) {
                try {
                    await this.$http.post('refrigerator_models/', {
                        name: name,
                        note: note,
                    },{headers: {authorization: `Bearer ${localStorage.access_token}`}});
                } catch (error) {
                    console.error(error);
                }
            },
            async deleteData(id){
                try{
                    await this.$http.delete("refrigerator_models/"+id+"/")
                }
                catch(error){
                    console.log(error)
                }
            },
            edit_item(id, new_name, new_note) {
                this.editData(id, new_name, new_note)
                this.refresh()
            },
            Add () {
                this.add_mode=true
            },
            add_item(name, note) {
                this.addData(name, note)
                this.add_mode=false
                this.refresh()
            },
            delete_item(id) {
                this.deleteData(id)
                this.refresh()
            },
            refresh() {
                setTimeout(() => { this.getData(); },500);
            },
            cancel_add() {
                this.add_mode = false
            },
        },
        created(){
            this.getData()
        }
    }
</script>

