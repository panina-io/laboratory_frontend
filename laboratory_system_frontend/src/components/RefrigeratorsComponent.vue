<template>
    <tr class="components" @dblclick="Edit">
        <td>{{ item.inventory_number }}</td><td>{{ item.model_name }}</td><td>{{ item.note }}</td> 
    </tr>
    <refrigerator-edit-form 
        v-if="edit_mode" 
        :item="item"
        :tmp="item.id"
        @cancel_edit="cancel_edit"
        @edit_item="edit_item"/>
</template>

<script>
    import RefrigeratorEditForm from './RefrigeratorEditForm.vue'
    export default{
        components: {
            RefrigeratorEditForm
        },
        props: {
            item: {
                type: Object,
            }, 
        },
        emits: ['edit_item'],
        data() {
           return {
            edit_mode: false
            }  
        },
        methods: {
            Edit() {
                this.edit_mode = true
            },
            edit_item(id, inventory_number, model, room, note) {
                this.$emit("edit_item", id, inventory_number, model, room, note)
                this.edit_mode = false
            },
            cancel_edit() {
                this.edit_mode = false
            },
        },
    }
</script>


<style>
  td {
	padding: 10px;
	font-size: 14px;
	line-height: 10px;
	color: #444441;
	border-top: 1px solid #716561;
}
    .components:hover {
    background: #bcbcbc6e;
    cursor: pointer;
}

</style>