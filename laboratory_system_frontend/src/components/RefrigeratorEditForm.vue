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
                       <input class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="new_inventory_number">
                        <label class="edit_component">Инвентарный номер</label>
                    </div>

                    <div class="input-text">
                        <select v-model="new_model" :key="tmp" class="input-style" required>
                            <variants name="refrigerator_models" :selected="item.model" />
                        </select>
                        <label class="edit_component">Холодильник</label>
                    </div>

                    <div class="input-text">
                        <select v-model="new_room" :key="tmp" class="input-style" required>
                            <variants name="rooms" :selected="item.room" />
                        </select>
                        <label class="edit_component">Холодильник</label>
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
                        @click="onCancel">Отмена</button>
                    </form> 
                </div>
            </div>
        </div>
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
                }
        },
        methods: {
            onSave() {
                this.$emit("edit_item", this.item.id, this.new_inventory_number, this.new_model, this.new_room, this.new_note)
            },
            onCancel() {
                this.$emit("cancel_edit")
            }
        }
    }
</script>

