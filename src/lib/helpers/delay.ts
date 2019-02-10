export default function (value: number) {
  return new Promise(resolve =>
    setTimeout(() => resolve(), value)
  )
}
