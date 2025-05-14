<template>
    <div class="modal-fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Добавление реактива</h5>
          </div>
  
          <div class="modal-body">
            <form id="AddForm">
              <div>
                <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
                <div class="input-text"
                    :class="{ 'input-error': validationErrors.lot }">
                  <input class="input-style" v-model.lazy.trim="lot" required />
                  <label class="edit_component">Лот</label>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.indicator }">
                  <select v-model="indicator" class="input-style" required>
                    <option value=""></option>
                    <variants name="indicators" :selected="indicator" />
                  </select>
                  <label class="edit_component">Показатель</label>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.manufacturer }">
                  <select v-model="manufacturer" class="input-style" required>
                    <option value=""></option>
                    <variants name="manufacturers" :selected="manufacturer" />
                  </select>
                  <label class="edit_component">Производитель</label>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.analyzer}">
                  <select v-model="analyzer" class="input-style" required>
                    <option value=""></option>
                    <variants name="analyzer_models" :selected="analyzer" />
                  </select>
                  <label class="edit_component">Анализатор</label>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.financing}">
                  <select v-model="financing" class="input-style" required>
                    <option value=""></option>
                    <variants name="financing" :selected="financing" />
                  </select>
                  <label class="edit_component">Источник финансирования</label>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.expiration_date }">
                  <input class="input-style" type="date" :min="today" v-model="expiration_date" required />
                  <label class="edit_component">Срок годности</label>
                </div>

                <div class="input-text" :class="{ 'input-error': validationErrors.balance}">
                  <input class="input-style" type="number" min="0" v-model="balance" required />
                  <label class="edit_component">Количество</label>
                </div>
  
                <div class="input-text" :class="{ 'input-error': validationErrors.sink }">
                  <select v-model="sink" class="input-style" required>
                    <option value=""></option>
                    <technic-variants name="refrigerators" :selected="sink" />
                  </select>
                  <label class="edit_component">Холодильник</label>
                </div>

                <div class="input-text">
                  <input class="input-style" v-model.lazy.trim="note" />
                  <label class="edit_component">Комментарий</label>
                </div>

                <button type="button" class="add_button" @click="onSave">Сохранить</button>
                <button type="button" class="add_cancel_button" @click="$emit('cancel_add')">Отмена</button>
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
        balance: '',
        sink: null,
        expenditure: null,
        validationErrors: {},
        errorMessage: ''
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
  
        if (!valid) {
          this.errorMessage = 'Пожалуйста, заполните все обязательные поля.'
        } else {
          this.errorMessage = ''
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
      }
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
  
  