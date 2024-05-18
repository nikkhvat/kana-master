

export const getChapters = async (lang: string) => {
  const data = await fetch(`https://kana-master.khvat.pro/api/chapters/${lang}`);
  const json = await data.json()

  return {
    data: json,
    status: data.status
  }
}

export const ping = async () => {
  const data = await fetch(`https://kana-master.khvat.pro/api/ping`);

  if (data.status === 200) {
    return true
  } 
  
  return false
}
