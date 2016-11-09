/*
 * Helper mutator functions
 * The MIT License
 * Akhil Pandey
 */

/* Mutator function for generating the link
 *
 * @param {String} opt
 *
 */

String.prototype.genStr = function () {
 let i = 0,
 	str = "",
 	num = Math.floor(Math.random()*(Math.pow(1000, 4))).toString()

 let store = {
     big: ['V', 'X', 'A', 'D', 'G', 'Y', 'D', 'U', 'O', 'Q'],
     lil: ['w', 'b', 'k', 'm', 'c', 'z', 'i', 's', 'f', 'p']
 }

 while(str.length < 20) {
     let count = Number(num[i])
     str += num[i] + store.big[count] + store.lil[count]
     i++
 }

 return (this + str)
}
