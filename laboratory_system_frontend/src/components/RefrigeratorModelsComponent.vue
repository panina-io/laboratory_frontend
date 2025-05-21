<template>
    <tr class="components" @dblclick="Edit">
        <td>{{ name }}</td><td>{{ note }}</td> 
    </tr>
    <refrigerator-models-edit-form 
        v-if="edit_mode"
        :id="this.id"
        :name="this.name" 
        :note="this.note"
        @edit_item="edit_item"
        @cancel_edit="cancel_edit"
        @delete_item="delete_item"/>
</template>

<script>
    import RefrigeratorModelsEditForm from './RefrigeratorModelsEditForm.vue'
    export default{
        components: {
            RefrigeratorModelsEditForm
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
            delete_item() {
                this.$emit("delete_item", this.id)
                this.edit_mode = false
            }
        },
    }
</script>

