<template>
    <div class="modal-fade"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <h5 class="modal-title">Новое помещение</h5>
                </div>
                <div class="modal-body">
                    <form id="EditForm">
                    <div class="input-text">
                       <input class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="name"
                        required>
                        <label class="edit_component" style="">Наименование*</label>
                    </div>
                    <div class="input-text">
                       <input
                        class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="note"/>
                        <label class="edit_component">Комментарий</label>
                    </div>
                    <button 
                        type="button"
                        form="EditForm"
                        class="add_button"
                        title="Сохранить"
                        @click="onSave">Сохранить</button>
                    <button 
                        type="button"
                        class="add_cancel_button"
                        form="EditForm"
                        title="Отменить"
                        @click="onCancel">Отмена</button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {name: "", note: ""}
        },
        methods: {
            onSave() {
                this.$emit("add_item", this.name, this.note)
            },
            onCancel() {
                this.$emit("cancel_add")
            },
        }
    }
</script>

