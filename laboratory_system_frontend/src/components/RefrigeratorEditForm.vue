<template>
    <div class="modal-fade"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <h5 class="modal-title">{{ item.inventory_number }}</h5>
                    <button class="closeModal" @click="onCancel">X</button>
                </div>
                <div class="modal-body">
                    <form id="EditForm">
                    <div class="input-text">
                        <label class="edit_component">Инвентарный номер</label>
                       <input class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="new_inventory_number">
                    </div>

                    <div class="input-text">
                        <label class="edit_component">Модель</label>
                        <select v-model="new_model" :key="tmp" class="input-style" required>
                            <variants name="refrigerator_models" :selected="item.model" />
                        </select>
                    </div>

                    <div class="input-text">
                        <label class="edit_component">Помещение</label>
                        <select v-model="new_room" :key="tmp" class="input-style" required>
                            <variants name="rooms" :selected="item.room" />
                        </select>
                    </div>

                    <div class="input-text">
                        <label class="edit_component">Комментарий</label>
                       <input
                        class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="new_note"/>
                    </div>
                    <div class="footer-btn">
                        <button type="button" class="add_button" @click="onSave">Сохранить</button>
                        <button type="button" class="add_cancel_button" @click="modalDelete">Удалить</button>
                    </div> 
                    </form> 
                </div>
            </div>
        </div>
    </div>
    <div v-if="isDelete" class="modal-sure" style="text-align: center; font-size: 20px;">
      <h3 class="auth-text">Вы уверены, что хотите удалить холодильник {{ item.inventory_number }}?</h3>
      <div>
        <button type="button" class="auth" form="login_form" @click="onDelete" style="background-color:#7d1212db;">Удалить</button>
    </div>
        <button type="button" class="auth" form="login_form" @click="onCancel" style="background-color: rgba(53, 54, 53, 0.747);">Отмена</button>
    </div>
</template>

<script>
import Variants from './Variants.vue'
    export default{
        components: { Variants },
        props: {
            item: {
                type: Object,
            },
            tmp: {
                type: Number,
            }
        },
        data() {
            return {new_inventory_number: this.item.inventory_number, 
                    new_model: this.item.model,
                    new_room: this.item.room,
                    new_note: this.item.note, 
                    isDelete: false
                }
        },
        methods: {
            onSave() {
                this.$emit("edit_item", this.item.id, this.new_inventory_number, this.new_model, this.new_room, this.new_note)
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

