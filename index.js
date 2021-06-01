import 'regenerator-runtime/runtime'
import axios from 'axios'
import { tempData } from './temp'

const BASE_URL = 'http://localhost:3000/historyData'

var arrayValues = JSON.parse(localStorage.getItem('oldArrayValues')) || []
var oldArrayValues = []
var newArrayValues = []

// != get initial data First time
const getArray = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (errors) {
    console.error(errors)
  }
}
getArray().then((res) => {
  localStorage.setItem('oldArrayValues', JSON.stringify(res))
  oldArrayValues = JSON.parse(localStorage.getItem('oldArrayValues'))
})
setInterval(() => {
  getArray().then((res) => {
    localStorage.setItem('newArrayValues', JSON.stringify(res))
    newArrayValues = JSON.parse(localStorage.getItem('newArrayValues'))
    // == get status 
    var oldArrayStatusValues = oldArrayValues.map(({ status }) => status)
    var newArrayStatusValues = newArrayValues.map(({ status }) => status)
    //  == find difference
   let difference = oldArrayStatusValues.filter(x => !newArrayStatusValues.includes(x)).concat(newArrayStatusValues.filter(x => !oldArrayStatusValues.includes(x)));

    console.log(oldArrayStatusValues, newArrayStatusValues)
    console.log(difference.length ? 'differnce is there' : 'difference not there')
    if(difference.length){
     console.log("show toast")
     localStorage.setItem('oldArrayValues', JSON.stringify(newArrayValues))
     console.log(oldArrayStatusValues)
     
    }
  })
}, 10000)

