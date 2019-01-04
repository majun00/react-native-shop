// /*
//  * @Description: 数据持久化封装
//  * @Author: majun
//  * @Date: 2019-01-04 09:47:09
//  * @LastEditors: majun
//  * @LastEditTime: 2019-01-04 10:21:14
//  */

// import Realm from 'realm'

// let RealmBase = {}

// const HomeSchema = {
//   name: 'HomeData',
//   properties: {
//     id: 'int',
//     title: 'string',
//     image: 'string',
//     mall: 'string',
//     pubtime: 'string',
//     fromsite: 'string'
//   }
// }

// const HTSchema = {
//   name: 'HTData',
//   properties: {
//     id: 'int',
//     title: 'string',
//     image: 'string',
//     mall: 'string',
//     pubtime: 'string',
//     fromsite: 'string'
//   }
// }

// // 初始化
// let realm = new Realm({ schema: [HomeSchema, HTSchema] })

// // 增
// RealmBase.create = (schema, data) => {
//   realm.write(() => {
//     for (let i = 0; i < array.length; i++) {
//       let temp = data[i]
//       realm.create(schema, {
//         id: temp.id,
//         title: temp.title,
//         image: temp.image,
//         mall: temp.mall,
//         pubtime: temp.pubtime,
//         fromsite: temp.fromsite
//       })
//     }
//   })
// }

// // 查
// RealmBase.loadAll = schema => {
//   return realm.objects(schema)
// }

// // 条件查询
// RealmBase.filtered = (schema, filtered) => {
//   let objects = realm.objects(schema)
//   let object = objects.filtered(filtered)
//   if (object) {
//     return object
//   } else {
//     return '未找到数据'
//   }
// }

// // 删
// RealmBase.removeAllData = schema => {
//   realm.write(() => {
//     let objects = realm.objects(schema)
//     realm.delete(objects)
//   })
// }

// // global.RealmBase = RealmBase
// export default RealmBase
