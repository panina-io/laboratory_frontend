<template>
    <div class="modal-fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Добавление реактива</h5>
            <button class="closeModal" @click="$emit('cancel_add')">X</button>
          </div>
  
          <div class="modal-body">
            <form id="AddForm">
              <div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <div class="input-text"
                    :class="{ 'input-error': validationErrors.lot }">
                  <label class="edit_component">Лот</label>
                  <input class="input-style" v-model.lazy.trim="lot" required />
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.indicator }">
                  <label class="edit_component">Показатель</label>
                  <select v-model="indicator" class="input-style" required>
                    <option value=""></option>
                    <variants name="indicators" :selected="indicator" />
                  </select>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.manufacturer }">
                  <label class="edit_component">Производитель</label>
                  <select v-model="manufacturer" class="input-style" required>
                    <option value=""></option>
                    <variants name="manufacturers" :selected="manufacturer" />
                  </select>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.analyzer}">
                  <label class="edit_component">Анализатор</label>
                  <select v-model="analyzer" class="input-style" required>
                    <option value=""></option>
                    <variants name="analyzer_models" :selected="analyzer" />
                  </select>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.financing}">
                  <label class="edit_component">Источник финансирования</label>
                  <select v-model="financing" class="input-style" required>
                    <option value=""></option>
                    <variants name="financing" :selected="financing" />
                  </select>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.expiration_date }">
                  <label class="edit_component">Срок годности</label>
                  <input class="input-style" type="date" :min="today" v-model="expiration_date" required/>
                </div>

                <div class="input-text" :class="{ 'input-error': validationErrors.balance}">
                  <label class="edit_component">Количество</label>
                  <input class="input-style" type="number" min="0" v-model.number="balance" required @change="validateBalance"/>
                  <span v-if="validationErrors.balance" class="balance-error">
                    Количество должно быть не меньше 1
                  </span>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.sink }">
                  <label class="edit_component">Холодильник</label>
                  <select v-model="sink" class="input-style" required>
                    <option value=""></option>
                    <technic-variants name="refrigerators" :selected="sink" />
                  </select>
                </div>

                <div class="input-text">
                  <label class="edit_component">Комментарий</label>
                  <input class="input-style" v-model.lazy.trim="note" />
                </div>
                <div class="footer-btn">
                <button type="button" class="add_button" @click="onSave">Сохранить</button>
                <button type="button" class="add_cancel_button" @click="$emit('cancel_add')">Отмена</button>
              </div>   
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
  
  export default {
    components: { Variants, TechnicVariants },
    data() {
      return {
        lot: '',
        indicator: null,
        manufacturer: null,
        analyzer: null,
        financing: null,
        expiration_date: '',
        note: '',
        balance: null,
        sink: null,
        expenditure: null,
        validationErrors: {},
        errorMessage: '',
      }
    },
    computed: {
      today() {
        const now = new Date()
        return now.toISOString().split('T')[0]
      }
    },
    methods: {
      validateForm() {
        this.validationErrors = {}
        let valid = true
  
        const requiredFields = ['lot', 'indicator', 'manufacturer', 'analyzer', 'financing', 'expiration_date', 'balance', 'sink']
        
        for (const field of requiredFields) {
          if (!this[field]) {
            this.validationErrors[field] = true
            valid = false
          }
        }

        if (this.balance !== '' && (Number(this.balance) < 1 || isNaN(Number(this.balance)))) {
          this.validationErrors.balance = true
          valid = false
        }

        if (!valid && !this.errorMessage) {
            this.errorMessage = 'Пожалуйста, заполните все обязательные поля.'
        }
        return valid
        
      },
  
      async onSave() {
        if (!this.validateForm()) return
  
        let createdLotId = null
        try {
          const lotRes = await this.$http.post('http://localhost:8000/api/reagents_lot/', {
            lot: this.lot,
            indicator: this.indicator,
            manufacturer: this.manufacturer,
            analyzer: this.analyzer,
            financing: this.financing,
            balance: this.balance,
            expiration_date: this.expiration_date,
            note: this.note
          },{headers: {authorization: `Bearer ${localStorage.access_token}`}})
  
          createdLotId = lotRes.data.id

          await this.$http.post('http://localhost:8000/api/reagent_move/', {
            box: createdLotId,
            expenditure: null,
            sink: this.sink,
            move: 'closed',
            note: this.note
          }, {headers: {authorization: `Bearer ${localStorage.access_token}`}})
  
          this.$emit('add_item')
        } catch (error) {
          console.error('Ошибка при создании:', error)
          this.errorMessage = 'Произошла ошибка при сохранении. Попробуйте снова.'
  
          if (createdLotId) {
            try {
              await this.$http.delete(`http://localhost:8000/api/reagents_lot/${createdLotId}/`,{headers: {authorization: `Bearer ${localStorage.access_token}`}})
              console.warn(`Лот #${createdLotId} удалён из-за ошибки`)
            } catch (delErr) {
              console.error('Ошибка при удалении лота:', delErr)
            }
          }
        }
      },
      validateBalance() {
    if (this.balance !== '' && (Number(this.balance) < 1 || isNaN(Number(this.balance)))) {
      this.validationErrors.balance = true
    } else {
      this.validationErrors.balance = false
      if (this.errorMessage === 'Количество должно быть не меньше 1') {
        this.errorMessage = ''
      }
    }
  },
    }
  }
  </script>
  
  <style scoped>
  .input-error input,
  .input-error select {
    border: 3px solid #7d1212db;;

  }
  
  .error-message {
    color: #7d1212db;
    font-size: 16px;
  }

  </style>
  
  