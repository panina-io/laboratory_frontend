<template>
    <div>
    <h1 class="section-name">
        Показатели
        <button class="add-item" @click="Add">
            +Добавить
        </button>
    </h1>
    <indicators-add-form v-if="add_mode" @cancel_add="cancel_add" @add_item="add_item"/>
    <table class="components-list">
        <thead>
            <tr class="table-header">
                <th class="head">
                Наименование
            </th>
            <th class="head">
                Примечание
            </th>
          </tr>
          </thead>
        <indicators-component
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
    import IndicatorsComponent from './IndicatorsComponent.vue';
    import IndicatorsAddForm from './IndicatorsAddForm.vue';
    export default{
        components: {
            IndicatorsComponent,
            IndicatorsAddForm
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
                    const response = await this.$http.get("indicators/", {headers: {authorization: `Bearer ${localStorage.access_token}`}})
                    this.items = response.data
                }
                catch(error){
                    console.log(error)
                }
            },
            async editData(id, name, note){
                try{
                    await this.$http.put("indicators/"+id+"/",{
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
                    await this.$http.post('http://localhost:8000/api/indicators/', {
                        name: name,
                        note: note,
                    },{headers: {authorization: `Bearer ${localStorage.access_token}`}});
                } catch (error) {
                    console.error(error);
                }
            },
            async deleteData(id){
                try{
                    await this.$http.delete("indicators/"+id+"/")
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


