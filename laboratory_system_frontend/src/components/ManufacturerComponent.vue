<template>
    <tr class="components" @dblclick="Edit">
        <td>{{ name }}</td><td>{{ note }}</td>
    </tr>
    <manufacturer-edit-form 
        v-if="edit_mode" 
        :id="this.id"
        :name="this.name" 
        :note="this.note"
        @edit_item="edit_item"
        @cancel_edit="cancel_edit"/>
</template>

<script>
    import ManufacturerEditForm from './ManufacturerEditForm.vue';
    export default{
        components: {
            ManufacturerEditForm
        },
        props: {
            id: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            note: {
                type: String,
            },  
        },
        data() {
           return {
            edit_mode: false
            }  
        },
        methods: {
            Edit() {
                this.edit_mode = true
            },
            edit_item(id, name, note) {
                this.$emit("edit_item", id, name, note)
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