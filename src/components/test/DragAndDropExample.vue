<template>
  <div>
    <v-row>
      <v-col>
        <draggable
            class="list-group"
            v-model="meals"
            v-bind="dragOptions"
            item-key="id"
            group="meals"
            @start="drag=true"
            @end="drag=false"
            :move="checkMove"
            :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        >
          <template v-slot:item="{ element }">
            <v-card class="list-group-item">
              <v-card-text
                  :class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                  @click="element.fixed = !element.fixed"
                  aria-hidden="true"
              >{{ element.name }}
              </v-card-text>
            </v-card>
          </template>
        </draggable>
      </v-col>
      <v-col>
        <draggable
            class="list-group"
            v-model="secondMeals"
            v-bind="dragOptions"
            item-key="id"
            group="meals"
            @start="drag=true"
            @end="drag=false"
            :move="checkMove"
            :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        >
          <template #item="{element}">
            <v-card class="list-group-item">
              <v-card-text
                  :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
                  @click="element.fixed = !element.fixed"
                  aria-hidden="true"
              >{{ element.name }}
              </v-card-text>
            </v-card>
          </template>
        </draggable>
      </v-col>
    </v-row>
  </div>
</template>

<script>

//https://github.com/SortableJS/vue.draggable.next
//https://sortablejs.github.io/vue.draggable.next/#/transition-example-2

import draggable from "vuedraggable";

export default {
  name: "DragAndDropExample",
  data: () => ({
    drag: false,
    display: "Transitions",
    order: 7,
    meals: [
      {
        name: 'test1',
        order: 1,
        fixed: false
      },
      {
        name: 'test2',
        order: 2,
        fixed: false
      },
      {
        name: 'test3',
        order: 3,
        fixed: false
      },
      {
        name: 'test4',
        order: 4,
        fixed: false
      },
    ],
    secondMeals: [
      {
        name: 'secondMtest1',
        order: 1,
        fixed: false
      },
      {
        name: 'secondMtest2',
        order: 2,
        fixed: false
      },
      {
        name: 'secondMtest3',
        order: 3,
        fixed: false
      },
      {
        name: 'secondMtest4',
        order: 4,
        fixed: false
      },
    ],
  }),
  components: {draggable},
  methods: {
    checkMove() {
      console.log("moving")
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
}
</script>

<style lang="sass" scoped>
.button
  margin-top: 35px

.flip-list-move
  transition: transform 0.5s

.no-move
  transition: transform 0s

.ghost
  opacity: 0.5
  background: #c8ebfb

.list-group1
  min-height: 20px

.list-group-item
  cursor: move


.list-group-item i
  cursor: pointer

</style>