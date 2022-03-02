<template>
  <div class="email-editor">
    <div
      class="email-editor__label"
      :class="isInputText ? 'email-editor__label__input' : ''"
    >
      <v-text-field
        v-if="isInputText"
        v-model="label"
        outlined
        dense
        hide-details="auto"
        class="input-richtext required"
      ></v-text-field>
      <span v-else>
        {{ label }}
        <span style="color: red; font-size: 12px" v-if="required">*</span>
      </span>
      <v-btn
        fab
        text
        color="primary"
        height="20px"
        width="20px"
        class="ml-1"
        @click="editlabel"
        v-if="isEdited"
      >
        <v-icon small>mdi-pencil-outline</v-icon>
      </v-btn>
    </div>
    <div class="email-editor__menubar">
      <div
        class="email-editor__menublock"
        v-for="(block, index) in menus"
        :key="index + 'block'"
      >
        <v-btn
          v-for="(menu, index) in block"
          :key="index + 'menu'"
          class="email-editor__menubar__item fw-500"
          :class="{
            'email-editor__menubar__item--active': menu.isActive
          }"
          @click="menu.action"
          :title="menu.title"
          icon
          color="black"
        >
          <v-icon size="16">{{ menu.icon }}</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="email-editor__content">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Content, Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

@Component({
  components: { EditorContent }
})
export default class EmailEditor extends Vue {
  @Prop({ default: '' }) value?: string
  @Prop({ default: 'Reason of Omission' }) label?: string
  @Prop({ default: false }) required?: boolean
  isEdited = false
  isInputText = false
  private editor = {} as Editor

  get menus() {
    return [
      [
        {
          icon: 'mdi-format-bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold')
        },
        {
          icon: 'mdi-format-italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic')
        },
        {
          icon: 'mdi-format-underline',
          title: 'Underline',
          action: () => this.editor.chain().focus().toggleUnderline().run(),
          isActive: () => this.editor.isActive('underline')
        },
        {
          icon: 'mdi-format-list-numbered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList')
        },
        {
          icon: 'mdi-format-list-bulleted-square',
          title: 'Un Ordered List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('orderedList')
        }
      ]
    ]
  }

  @Watch('value')
  updateEditor(value: string): void {
    const isSame = this.editor.getHTML() === value
    if (isSame) {
      return
    }
    this.editor.commands.setContent(this.value as Content, false)
  }

  mounted(): void {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Link,
        Placeholder
      ],
      content: this.value,
      editorProps: {
        attributes: {
          class: 'email-editor__editor'
        }
      },
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
        this.$emit('change', this.editor.getHTML())
      },
      onFocus: ({ editor }) => {
        this.focusRichText()
        editor.commands.selectAll()
      }
    })
  }

  editlabel(): void {
    this.isInputText = !this.isInputText
  }

  focusRichText(): void {
    this.isEdited = true
  }

  beforeDestroy(): void {
    this.editor.destroy()
  }
}
</script>
<style lang="scss">
.input-richtext {
  fieldset {
    border: none !important;
    background: none !important;
  }
}
</style>
<style lang="scss" scoped>
.email-editor {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border: 1px solid #dfdfef;
  padding: 16px;
  border-radius: 4px;
  position: relative;
  &__menubar {
    border: 1px solid #dfdfef;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    padding: 4px;
    margin-bottom: 10px;
  }
  &__menublock {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__content {
    border-radius: 4px;
    min-height: 60px;
    overflow-y: scroll;
    padding: 10px 12px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.email-editor .email-editor__label {
  position: absolute;
  left: 8px;
  top: -14px;
  background-color: white;

  font-family: Mukta;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 16px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
}
.email-editor__label__input {
  top: -20px !important;
}
::v-deep {
  /* Basic editor styles */
  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }
  }

  /* Placeholder (at the top) */
  .ProseMirror p.is-editor-empty:first-child::before {
    content: 'Type something';
    float: left;
    color: #87879d;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    pointer-events: none;
    height: 0;
  }
}
</style>
<style lang="scss">
.email-editor__content {
  font-size: 12px !important;
  p {
    font-family: Roboto;
  }
}
.email-editor__editor {
  height: 60px;
  outline: none !important;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    margin-bottom: 0 !important;
  }
}
.email-editor__menubar {
  height: 32px;
}
</style>
