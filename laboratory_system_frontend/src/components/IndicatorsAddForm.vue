<template>
    <div class="modal-fade"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <h5 class="modal-title">Добавление показателя</h5>
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

<style>
    .save_button {
        position: relative;
        bottom: -40px;
        left: -10px;
        background-color: #7d1212db;
        border-radius: 5px;
        border-color: transparent;
        color: white;
        padding: 8px 12px;
        text-decoration: none;
        cursor: pointer;      
    }
    .cancel_button {
        position: relative;
        bottom: -40px;
        left: 10px;
        background-size: cover;
        background-color: rgba(53, 54, 53, 0.747);
        border-radius: 5px;
        border-color: transparent;
        color: white;
        padding: 8px 12px;
        text-decoration: none;
        cursor: pointer;  
    }


</style>