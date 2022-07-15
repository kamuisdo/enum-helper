import EnumHelper from '../src/index'

const objectArr = [
	{ id:1, value:'apple', color:'red', share: ()=>{ return 'give you an apple' } },
	{ id:2, value:'banner', color:'yellow', share: ()=>{ return 'give you a banner' } },
]


test('create instance',()=>{
	expect(() => new EnumHelper([{id:1,value:'a'},{id:1,value:'b'}])).toThrow()
	expect(() => new EnumHelper([{id:()=>{ return 1 },value:'a'}])).toThrow()
	expect(() => new EnumHelper([])).toThrow()
})

test('getById',()=>{
	expect(new EnumHelper(objectArr).getById(1).value).toBe('apple')
})

test('getByValue',()=>{
	expect(new EnumHelper(objectArr).getByValue('apple').id).toBe(1)
})

test('getBy',()=>{
	expect(new EnumHelper(objectArr).getBy('color','red').id).toBe(1)
})

test('toArray',()=>{
	expect(new EnumHelper(objectArr).toArray('id')).toEqual([1,2])
})
