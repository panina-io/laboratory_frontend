<template>
    <div>
    <h1 class="section-name">
        Холодильники
        <button class="add-item" @click="Add">
            +Добавить
        </button>
    </h1>
    <refrigerator-add-form v-if="add_mode" @cancel_add="cancel_add" @add_item="add_item"/>
    <table class="components-list">
        <thead>
            <tr class="table-header">
                <th class="head">
                Инвертарный номер
            </th>
            <th class="head">
                Модель
            </th>
            <th class="head">
                Примечание
            </th>
          </tr>
        </thead>
        <refrigerators-component
                v-for="item in items"
                    :item="item"
                    @edit_item="edit_item"/>
        </table>
</div>
</template>

<script>
    import RefrigeratorsComponent from './RefrigeratorsComponent.vue'
    import RefrigeratorAddForm from './RefrigeratorAddForm.vue'
    export default{
        components: {
            RefrigeratorsComponent,
            RefrigeratorAddForm
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
                    const response = await this.$http.get("refrigerators/", {headers: {authorization: `Bearer ${localStorage.access_token}`}})
                    this.items = response.data
                }
                catch(error){
                    console.log(error)
                }
            },
            async editData(id, inventory_number, model, room, note){
                try{
                    await this.$http.put("refrigerators/"+id+"/",{
                        inventory_number: inventory_number, model: model, room: room, note: note}, {headers: {
                        authorization: `Bearer ${localStorage.access_token}`
                    }})
                }
                catch(error){
                    console.log(error)
                }
            },
            async addData(inventory_number, model, room, note) {
                try {
                    await this.$http.post('refrigerators/', {
                        inventory_number: inventory_number, model: model, room: room, note: note
                    },{headers: {authorization: `Bearer ${localStorage.access_token}`}});
                } catch (error) {
                    console.error(error);
                }
            },
            edit_item(id, new_inventory_number, new_model, new_room, new_note) {
                this.editData(id, new_inventory_number, new_model, new_room, new_note)
                this.refresh()
            },
            Add () {
                this.add_mode=true
            },
            add_item(inventory_number, model, room, note) {
                this.addData(inventory_number, model, room, note)
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


