<template>
    <div>
    <h1 class="section-name">
        Холодильники
    </h1>
    <table class="components-list">
        <tr>
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
        <refrigerators-component
                v-for="item in items"
                    :item="item"
                    @edit_item="edit_item"/>
        </table>
</div>
</template>

<script>
    import RefrigeratorsComponent from './RefrigeratorsComponent.vue'
    export default{
        components: {
            RefrigeratorsComponent,
        },
        data(){
            return {
                items: []
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
            edit_item(id, new_inventory_number, new_model, new_room, new_note) {
                this.editData(id, new_inventory_number, new_model, new_room, new_note)
                this.refresh()
            },
            refresh() {
                setTimeout(() => { this.getData(); },500);
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
div {
    text-align: center;
    text-decoration: none;
    letter-spacing: 2px;
    font-size: 17px;
    transition: color .2s;
}

td {
	padding: 10px;
	font-size: 14px;
	line-height: 10px;
	color: #444441;
	border-top: 1px solid #716561;
}

</style>

