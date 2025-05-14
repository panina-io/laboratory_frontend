<template>
    <div>
        <h1 class="section-name">
            Реактивы
            <button class="add-item" @click="resetFilters">Удалить фильтры</button>
            <button class="add-item" @click="Add">+Добавить</button>
        </h1>

        <reagent-lot-add-form
            v-if="add_mode"
            @cancel_add="cancel_add"
            @add_item="add_item"
        />

        <table class="components-list">
            <thead>
                <tr>
                    <th class="head" style="cursor: pointer;" @click="sortBy('box__indicator__name')">Показатель  
                        <span v-if="sortKey === 'box__indicator__name'">
                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </th>
                    <th class="head" style="cursor: pointer;" @click="sortBy('box__manufacturer__name')" >Производитель
                        <span v-if="sortKey === 'box__manufacturer__name'">
                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </th>
                    <th class="head">Лот/серия</th>
                    <th class="head" style="cursor: pointer;" @click="sortBy('box__expiration_date')" >Срок годности
                        <span v-if="sortKey === 'box__expiration_date'">
                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </th>
                    <th class="head" style="cursor: pointer;" @click="sortBy('box__balance')" >Остаток
                        <span v-if="sortKey === 'box__balance'">
                        {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </th>
                    <th class="head">Состояние
                    </th>
                    <th class="head">Место хранения</th>
                    <th class="head">Примечание</th>
                </tr>
                <tr>
                    <th class="head-filter">
                        <select class="filters" v-model="filters.indicator" @change="getData">
                            <option value="">Показатель</option>
                            <variants name="indicators" :selected="indicator" />
                         </select>
                    </th>
                    <th class="head-filter">
                        <select class="filters" v-model="filters.manufacturer" @change="getData">
                            <option value="">Производитель</option>
                            <variants name="manufacturers" :selected="manufacturer" />
                         </select>
                    </th>
                    <th class="head-filter"> <input class="filters" v-model="filters.lot" placeholder="Лот/Серия" @input="getData" /></th>
                    <th class="head-filter">
                        <select class="filters" v-model="filters.date_op" @change="getData">
                            <option value="">=</option>
                            <option value="_before">≤</option>
                            <option value="_after">≥</option>
                        </select>
                        <input
                        class="filters"
                        type="date"
                        v-model="filters.date_value"
                        @input="getData"
                        />
                    </th>
                    <th class="head-filter">
                        <select class="filters" v-model="filters.balance_op" @change="getData">
                            <option value="">=</option>
                            <option value="_max">≤</option>
                            <option value="_min">≥</option>
                        </select>
                        <input
                        class="filters"
                        type="number"
                        v-model="filters.balance_value"
                        placeholder="Остаток"
                        @input="getData"
                        />
                    </th>
                    <th class="head-filter"></th>
                    <th class="head-filter"></th>
                    <th class="head-filter"></th>
                </tr>
            </thead>
            <tbody>
                <reagent-lot-component
                    v-for="item in latestMove"
                    :item="item"
                    :key="item.id"
                    @edit_item="edit_item"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import ReagentLotComponent from './ReagentLotComponent.vue';
import ReagentLotAddForm from './ReagentLotAddForm.vue';
import Variants from './Variants.vue';

export default {
    components: {
        ReagentLotComponent,
        ReagentLotAddForm,
        Variants
    },
    data() {
        return {
            items: [],
            add_mode: false,
            filters: {
                lot: '',
                manufacturer: '',
                indicator: '',
                move: '',
                balance_op: '',
                balance_value: '',
                date_op: '',
                date_value: ''
            },
            sortKey: '',
            sortOrder: 'asc', 
        };
    },
    computed: {
        latestMove() {
        const latest = new Map();
        for (const move of this.items) {
            if (move.box_data && move.box_data.id) {
                const lotId = move.box_data.id;
                if (
                    !latest.has(lotId) ||
                    new Date(move.add_time) > new Date(latest.get(lotId).add_time)
                ) {
                    latest.set(lotId, move);
                }
            }
        }
        return Array.from(latest.values());
    }
},
    methods: {
        async getData() {
    try {
        const params = {};
        if (this.filters.lot) params.box__lot = this.filters.lot;
        if (this.filters.manufacturer) params.box__manufacturer = this.filters.manufacturer;
        if (this.filters.indicator) params.box__indicator = this.filters.indicator;

        if (this.filters.balance_op || this.filters.balance_value !== '') {
            const key = `box__balance${this.filters.balance_op}`;
            params[key] = this.filters.balance_value;
        }

        if (this.filters.date_op || this.filters.date_value) {
            const key = `box__expiration_date${this.filters.date_op}`;
            const formattedDate = new Date(this.filters.date_value).toISOString().slice(0, 10);
            params[key] = formattedDate;
        }
        
        if (this.sortKey) {
            params.ordering = this.sortOrder === 'asc' ? this.sortKey : `-${this.sortKey}`;
        }

        const response = await this.$http.get("reagent_move/", {
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
            params
        });
        this.items = response.data

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.items = []; 
    }
},
        async editData(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note) {
            try {
                await this.$http.post("reagent_move/",
                    {
                        box: box_id,
                        expenditure: new_expenditure,
                        move: new_move,
                        sourse: new_source,
                        sink: new_sink,
                    },
                    {
                        headers: { authorization: `Bearer ${localStorage.access_token}` }
                    }
                );
                await this.$http.patch(`reagents_lot/${box_id}/`, {
                    balance: new_balance, note: new_note
                }, {
                    headers: { authorization: `Bearer ${localStorage.access_token}` }
                });
            } catch (error) {
                console.log(error);
            }
        },
        edit_item(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note) {
            this.editData(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note);
            this.refresh();
        },
        Add() {
            this.add_mode = true;
        },
        add_item() {
            this.add_mode = false;
            this.refresh();
        },
        refresh() {
            clearTimeout(this.refreshTimeout);
            setTimeout(() => {
                this.getData();
            }, 500);
        },
        cancel_add() {
            this.add_mode = false;
        },
        resetFilters() {
            this.filters = { 
                lot: '', 
                manufacturer: '', 
                indicator: '' ,
                move: '',
                balance_op: '',
                balance_value: '',
                date_op: '',
                date_value: ''
            };
            this.getData();
        },
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
  this.getData();
}
    },
    created() {
        this.getData();
    }
};
</script>

<style scoped>
div {
    text-align: center;
    text-decoration: none;
    letter-spacing: 2px;
    font-size: 16px;
    transition: color 0.2s;
}

td {
    padding: 10px;
    font-size: 12px;
    line-height: 10px;
    color: #444441;
    border-top: 1px solid #716561;
}

.filters {
    min-width: 30px;
    justify-content: center;
    background-color: #fff;
    color: #000000db;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 2px 6px;
    box-sizing: border-box;
}

.filter-inline {
  display: flex;
  gap: 1px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

input[type="number"].filters {
  width: 80px; 
  box-sizing: border-box;
}

.filters:focus {
    outline: none;
}

</style>
