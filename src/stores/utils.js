class Utils {
  async copyToBuffer(value){
    try {
      await navigator.clipboard.writeText(value);
      console.log('Текст скопирован в буфер обмена:', value);
    } catch (err) {
      console.error('Ошибка при копировании текста:', err);
    }
  }
}
export default new Utils();