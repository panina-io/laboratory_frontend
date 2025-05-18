<template>
    <div class="modal-fade"  tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content"> 
                <div class="modal-header">
                    <h5 class="modal-title">Карточка реактива</h5>
                    <button class="closeModal" @click="onCancel">X</button>
                    <div class="modal-header-buttons">
                    <button class="editStatus" 
                            @click="editStatus"         
                            :disabled="isOpen || isEndStatus"
                            :class="{'btn-disabled': isOpen || isEndStatus}">Открыть</button>
                    <button class="editStatus" 
                            @click="editStatus"         
                            :disabled="isEndStatus"
                            :class="{'btn-disabled': isEndStatus}">Списать</button>
                </div>
                </div>
                <div class="modal-body">
                    <form id="EditForm">
                        <div class="input-text">
                        <label class="edit_component">Лот</label>
                        <input class="input-style" v-model="item.box_data.lot" disabled />

                    </div>

                    <div class="input-text">
                        <label class="edit_component">Показатель</label>
                       <input class="input-style" v-model="item.box_data.indicator_name" :key="tmp" disabled />

                    </div>

                    <div class="input-text">
                        <label class="edit_component">Производитель</label>
                        <input class="input-style" v-model="item.box_data.manufacturer_name" :key="tmp" disabled />
                    </div>
                    
                    <div class="input-text">
                        <label class="edit_component">Анализатор</label>
                       <input class="input-style" v-model="item.box_data.analyzer_name" :key="tmp" disabled />
                    </div>

                    <div class="input-text">
                        <label class="edit_component">Источник финансирования</label>
                       <input class="input-style" v-model="item.box_data.financing_name" :key="tmp" disabled />

                    </div>

                    
                    <div class="input-text">
                        <label class="edit_component">Состояние</label>
                        <input class="input-style" v-model="item.move_name" :key="tmp" disabled />

                    </div>

                    <div class="input-text">
                        <label class="edit_component">Количество</label>
                       <input class="input-style" v-model="item.box_data.balance" :key="tmp" disabled />

                    </div>

                    <div class="input-text">
                        <label class="edit_component">Срок годности</label>
                       <input class="input-style" v-model="item.box_data.expiration_date" :key="tmp" disabled  :style="getRowStyle(item.box_data.expiration_date)"/>

                    </div>

                    <div class="input-text">
                        <label v-if="isExpenditureValid" class="edit_component">Расход</label>
                        <label v-else class="edit_component">Недопустимое значение. Введите число от 0 до {{ item.box_data.balance }}.</label>
                        <input
                            class="input-style"
                            type="number"
                            min="0"
                            :max="item.box_data.balance"
                            v-model="new_expenditure"
                            @input="onExpenditureChange"
                        />

                    </div>

              <div class="input-text">
                <label class="edit_component">Холодильник</label>
                <select 
                    v-model="new_sink" 
                    class="input-style" 
                    required>
                        <technic-variants name="refrigerators" :selected="item.sink" />
                </select>

              </div>

              <div class="input-text">
                <label class="edit_component">Комментарий</label>
                <input class="input-style" v-model.lazy.trim="new_note" />

              </div>
              <div class="footer-btn">
                    <button 
                        type="button"
                        form="EditForm"
                        class="add_button"
                        title="Сохранить"
                        @click="onSave"
                        :disabled="!isExpenditureValid"
                        :class="{'btn-disabled': !isExpenditureValid}">Сохранить</button>
                    <button 
                        type="button"
                        class="add_cancel_button"
                        form="EditForm"
                        title="Отменить"
                        @click="onCancel">Отмена</button>
                </div>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Variants from './Variants.vue'
import TechnicVariants from './TechnicVariants.vue'
import dayjs from 'dayjs'
    export default{
        components: { Variants, TechnicVariants },
        props: {
            item: {type: Object}
        },
        data() {
            return {box_id: this.item.box,
                    new_expenditure: null, 
                    new_move: this.item.move,
                    new_source: this.item.sink,
                    new_sink: this.item.sink, 
                    new_note: this.item.box_data.note,
                    balance: this.item.box_data.balance,
                    tmp: 0,
                    isExpenditureValid: true,
                    isOpen: false,
                    isEndStatus: false,
                }
        },
        emits: ['edit_item'],
        methods: {
            onExpenditureChange(event) {
                const value = parseInt(event.target.value);
                if (value < 0 || value > this.item.box_data.balance) {
                    this.isExpenditureValid = false;
                } else {
                    this.isExpenditureValid = true;
                }
            },
            onSave() {
                const new_balance = this.balance-this.new_expenditure
                if (this.new_expenditure != 0 && this.new_move == 'closed')  {
                    this.new_move = 'open'
                }
                if (new_balance == 0) {
                    this.new_move = 'disposed'
                }
                this.$emit("edit_item", this.box_id, this.new_expenditure, new_balance, this.new_move, this.new_source, this.new_sink, this.new_note)
            },
            onCancel() {
                this.$emit("cancel_edit")
            },
            statusCheck() {
                if (this.new_move == 'open') {
                    this.isOpen = true
                } else if (this.new_move == 'expired' || this.item.move == 'disposed') {
                    this.isEndStatus = true
                }
            },
            getRowStyle(expiration_date) {
                const currentDate = new Date()
                const expiry = new Date(expiration_date)
                const diffInMillis = expiry - currentDate;
                const diffInDays = Math.floor(diffInMillis / (1000*60*60*24));
                if (diffInDays > 180) {
                    return { backgroundColor: '#9ACD32' };  // Более 6 месяцев
                } else if (diffInDays > 90) {
                    return { backgroundColor: 'yellow' };  // Более 3 месяцев
                } else if (diffInDays >= 0) {
                    return { backgroundColor: '#FF8C00' };  // Менее 3 месяцев
                } else {
                    return { backgroundColor: '#D1212D' };  // Просрочено
                }
            },
            formatDate(date) {
                return dayjs(date).format('DD.MM.YYYY HH:mm');
                },
        },
        mounted() {
            this.statusCheck()
        }
    }
</script>

<style scoped>

    .footer-btn{
        display: flex;          
        gap: 10px;             
        align-items: center;   
        flex-wrap: wrap; 
    }

</style>