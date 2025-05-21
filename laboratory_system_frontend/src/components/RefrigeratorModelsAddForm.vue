<template>
    <div class="modal-fade"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <h5 class="modal-title">Новая модель холодильника</h5>
                </div>
                <div class="modal-body">
                    <form id="EditForm">
                    <div class="input-text">
                        <label class="edit_component">Модель*</label>
                       <input class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="name"
                        required>
                    </div>
                    <div class="input-text">
                        <label class="edit_component">Комментарий</label>
                       <input
                        class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="note"/>
                        
                    </div>
                    <div class="footer-btn">
                        <button type="button" class="add_button" @click="onSave">Сохранить</button>
                        <button type="button" class="add_cancel_button" @click="onCancel">Отмена</button>
                    </div> 
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

