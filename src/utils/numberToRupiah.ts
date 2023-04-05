const numberToRupiah = (angka: string | number) => {
  const number_string = angka.toString(),
    sisa = number_string.length % 3,
    ribuan = number_string.substring(sisa).match(/\d{3}/g);
  const split = number_string.split(',');
  let rupiah = number_string.substring(0, sisa);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return (
    'Rp.' + (split[1] != undefined ? rupiah + ',' + split[1] : rupiah) + ' ,-'
  );
};

export default numberToRupiah;
