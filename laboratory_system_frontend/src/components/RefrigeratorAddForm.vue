<template>
    <div class="modal-fade"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <h5 class="modal-title">Новый холодильник</h5>
                </div>
                <div class="modal-body">
                    <form id="EditForm">
                    <div class="input-text">
                        <label class="edit_component">Инвентарный номер*</label>
                       <input class="input-style"
                        form="EditForm"
                        rows="1"
                        cols="17"
                        v-model.lazy.trim="inventory_number"
                        required>
                    </div>

                    <div class="input-text">
                        <label class="edit_component">Модель</label>
                        <select v-model="model" :key="tmp" class="input-style" required>
                            <option value=""></option>
                            <variants name="refrigerator_models" :selected="model" />
                        </select>
                    </div>

                    <div class="input-text">
                        <label class="edit_component">Помещение</label>
                        <select v-model="room" :key="tmp" class="input-style" required>
                            <option value=""></option>
                            <variants name="rooms" :selected="room" />
                        </select>
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
    import Variants from './Variants.vue'
    export default{
        components: { Variants },
        data() {
            return {inventory_number: "", model: null, room: null, note: ""}
        },
        methods: {
            onSave() {
                this.$emit("add_item", this.inventory_number, this.model, this.room, this.note)
            },
            onCancel() {
                this.$emit("cancel_add")
            },
        }
    }
</script>

