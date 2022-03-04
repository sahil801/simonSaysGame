
function ColorCard({color ,onClick ,flash}) {
  return (
    <div onClick={onClick} id={`${flash?"flash":""}`} className={`colorCard ${color} `} />
    // </div>
  )
}

export default ColorCard