import uniqBy from 'lodash/uniqBy'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'

type plantType = number | string | boolean

type item = {
	id: plantType
	value: plantType
	[propName: string]: any
}

function throwError(text: string) {
	throw new Error(`EnumHelper:${text}`)
}

function isNotPlantValeType(value: any) {
	return !isNumber(value) && !isBoolean(value) && !isString(value)
}

class EnumHelper {
	readonly _objectArr: item[]

	constructor(objectArr: item[]) {
		if (objectArr.length === 0) {
			throwError('params can not be []')
		}
		// 检测id不能重复
		const uniqArr = uniqBy(objectArr, 'id')
		if (uniqArr.length < objectArr.length) {
			throwError('id can not repeated')
		}
		// 每个对象都是必须是PlantObject，id和value必填
		const filterArr = objectArr.find((item) => {
			return (
				item.id === undefined ||
				item.id === null ||
				item.value === undefined ||
				item.value === null ||
				isNotPlantValeType(item.id) ||
				!isPlainObject(item)
			)
		})
		if (filterArr) {
			throwError(
				'id,value can not be null/undefined,and item should be PlantObject'
			)
		}
		this._objectArr = objectArr
	}

	toObjectArray() {
		return this._objectArr
	}

	getById(id: plantType) {
		return this._objectArr.find((item) => {
			return item.id.toString() === id.toString()
		})
	}

	getByValue(value: plantType) {
		return this._objectArr.find((item) => {
			return item.value === value
		})
	}

	getBy(key: keyof item, data: plantType) {
		return this._objectArr.find((item) => {
			return item[key] === data
		})
	}

	toArray(key: keyof item) {
		return this._objectArr.map((item) => {
			return item[key]
		})
	}
}

export default EnumHelper
