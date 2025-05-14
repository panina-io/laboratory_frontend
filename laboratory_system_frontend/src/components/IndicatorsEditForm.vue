<template>
    <div class="modal-fade"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <button class="closeModal" @click="onCancel">X</button>
                    <h5 class="modal-title">{{ name }}</h5>
                </div>
                <div class="modal-body">
                    <form id="EditForm">
                    <div class="input-text">
                       <input class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="new_name">
                        <label class="edit_component">Наименование</label>
                    </div>
                    <div class="input-text">
                       <input
                        class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="new_note"/>
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
                        @click="modalDelete">Удалить</button>
                    </form> 
                </div>
            </div>
        </div>
    </div>
    <div v-if="isDelete" class="modal-sure" style="text-align: center; font-size: 20px;">
        <h3 class="auth-text">Вы уверены, что хотите удалить {{ name }}?</h3>
      <div>
        <button type="button" class="auth" form="login_form" @click="onDelete" style="background-color:#7d1212db;">Удалить</button>
    </div>
        <button type="button" class="auth" form="login_form" @click="onCancel" style="background-color: rgba(53, 54, 53, 0.747);">Отмена</button>
    </div>
</template>

<script>
    export default{
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
                required: false,
            }
        },
        data() {
            return {
                new_name: this.name, 
                new_note: this.note,
                isDelete: false
            }
        },
        methods: {
            onSave() {
                this.$emit("edit_item", this.id, this.new_name, this.new_note)
            },
            onCancel() {
                this.$emit("cancel_edit")
            },
            onDelete() {
                this.isDelete=false
                this.$emit("delete_item", this.id)
            },
            modalDelete () {
                this.isDelete=true
            }
        }
    }
</script>
