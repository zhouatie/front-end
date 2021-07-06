var base64 = ['A', 'B', 'C', "D", 'E', 'F', 'G', 'H', 'I', "J", "K", 'L', "M", "N", "O", "P", "Q", "R", "S", "T", 'U','V','W','X', 'Y', 'Z'
,'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
'0','1','2','3', '4','5','6','7','8','9','+','/']

function encode (num) {
  console.log(num)
  let binary = num.toString(2);
  console.log('转成二进制', binary)
  binary = num > 0 ? binary + '0' : binary + '1'
  console.log('如果数字大于0，末位补0，小于0，末位补1')
  binary = binary.padStart(Math.ceil(binary.length / 5) * 5, '0')
  console.log('每五个一组，不足的前面补0', binary)
  let parts = binary.match(/\d{5}/g);
  console.log('拆成5个一组', parts)
  parts.reverse();
  console.log('反转', parts);
  parts = parts.map((o, i) => {
    if (i === parts.length - 1) {
      return '0' + o
    }
    return '1' + o
  })
  console.log('除了最后一组，其他的第一个都补充1', parts)
  parts = parts = parts.map(o => {
    return parseInt(o, 2)
  })
  console.log('将二进制转化成10进制', parts)
  parts = parts.map(o => {
    return base64[o]
  })
  console.log('将十进制对应到base64中的base64字符', parts);
  const str = parts.join('');
  console.log('输出转换后的字符', str)
}
encode(150)