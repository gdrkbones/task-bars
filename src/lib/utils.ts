const fetcher = (url: string, ...args: any) =>
  fetch(url, ...args).then((res) => {
    console.log(res)
    return res.json()
  })

export { fetcher }
