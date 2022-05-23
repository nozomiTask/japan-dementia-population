export interface DEMENTIAPOP {
  area: string
  dPopMale: {}
  dPopFemale: {}
  dPopAll: {}
  dPopMaleSum: number //全人数
  dPopFemaleSum: number
  dPopAllSum: number
  dPopMale65: number //65歳以上認知症人数
  dPopFemale65: number
  dPopAll65: number
  PopMale65: number //65歳以上人口
  PopFemale65: number
  PopAll65: number
  dRateMale65: number //65歳以上認知症有病率
  dRateFemale65: number
  dRateAll65: number

/*
  dPopMaleAge: agePop[] //x歳以上認知症人数
  dPopFemaleAge: agePop[]
  dPopAllAge: agePop[]
  PopMaleAge: agePop[] //x歳以上人口
  PopFemaleAge: agePop[]
  PopAllAge: agePop[]
  dRateMaleAge: agePop[] //x歳以上認知症有病率
  dRateFemaleAge: agePop[]
  dRateAllAge: agePop[]

*/
  year: string
  order: number
  dementiaCategory: string //dementia, mci, dementiaAndMci
  source: string
}

interface agePop {
  over: number
  value: number
}
