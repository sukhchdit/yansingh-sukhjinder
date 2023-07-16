export interface FieldModel {
    controlType: number
    title: string
    titleFontSize: number
    labelEditable: boolean
    isRequired: boolean
    isBold: boolean
    selectedField: boolean
    properties: any
}

export interface InputFieldModel {
    controlName: string
    maxLength: number | null
    minLength: number | null
}

export interface TextareaFieldModel {
    numOfRows: number | null
    numOfColumns: number | null
}

export interface MultiFieldModel {
    options: Array<object>
}


export enum FieldType {
    text = 1,
    textarea,
    checkbox,
    radio,
    dropdown,
    title,
    table,
    divider,
    fileupload,
    signaturepad
}