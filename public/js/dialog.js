const script = document.createElement('script')
script.src = '../js/qs.min.js'
document.head.appendChild(script)
script.onload = () => {
  const href = location.href
  const index = href.indexOf('?')
  if (index !== -1) {
    const p = href.substring(index + 1)
    const {confirmText = '确认',cancelText = '取消',cancelBtn,confirmBtn} = Qs.parse(p)
    const cancel = document.getElementById('cancel')
    const confirm = document.getElementById('confirm')
    if(cancel && confirm){
      if(cancelBtn && cancelBtn === 'false'){
        cancel.style.display = 'none'
      }else if(cancelText !== ''){
        cancel.textContent = cancelText
      }
      if(confirmBtn && confirmBtn === 'false'){
        confirm.style.display = 'none'
      }else if(confirmText !== ''){
        confirm.textContent = confirmText
      }
    }
  }
}

function cancel(){
  window.electronAPI.onDialogConfirm({
    action: 'cancel'
  })
  window.close()
}
function confirm(){
  window.electronAPI.onDialogConfirm({
    action: 'confirm'
  })
  window.close()
}
