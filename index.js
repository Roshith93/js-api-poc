import 'regenerator-runtime/runtime'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/historyData'

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
  oldArrayValues = res
})

setInterval(() => {
  getArray().then((res) => {
    newArrayValues = res
    // == get status
    var oldArrayStatusValues = oldArrayValues.map(({ status }) => status)
    var newArrayStatusValues = newArrayValues.map(({ status }) => status)
    console.log(oldArrayStatusValues)
    console.log(newArrayStatusValues)
    //  == find difference
    let difference = oldArrayStatusValues
      .filter((x) => !newArrayStatusValues.includes(x))
      .concat(
        newArrayStatusValues.filter((x) => !oldArrayStatusValues.includes(x))
      )

    console.log(
      difference.length ? 'differnce is there' : 'difference not there'
    )
    if (difference.length) {
      oldArrayValues = newArrayValues
      console.log('show toast')
      // ? if toast is there, dont show toast, just update the array only
    }
  })
}, 10000)
