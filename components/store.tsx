import { create } from 'zustand';

export const useSearchVariables = create((set) => ({
    isSearch: false,
    keyword: undefined,
    selectCity: undefined,
    selectDistrict: undefined,
    selectJob: undefined,
    selectExp: undefined,
    selectSalary: undefined,
    selectLevel: undefined,
    selectWorkForm: undefined,
    setIsSearch: (newIsSearch: any) => set({ isSearch: newIsSearch }),
    setKeyword: (newKeyword: any) => set({ keyword: newKeyword }),
    setSelectCity: (newSelectCity: any) => set({ selectCity: newSelectCity }),
    setSelectDistrict: (newSelectDistrict: any) => set({ selectDistrict: newSelectDistrict }),
    setSelectJob: (newSelectJob: any) => set({ selectJob: newSelectJob }),
    setSelectExp: (newSelectExp: any) => set({ selectExp: newSelectExp }),
    setSelectSalary: (newSelectSalary: any) => set({ selectSalary: newSelectSalary }),
    setSelectLevel: (newSelectLevel: any) => set({ selectLevel: newSelectLevel }),
    setSelectWorkForm: (newSelectWorkForm: any) => set({ selectWorkForm: newSelectWorkForm }),
    setAllSelect: (
        newKeyword: any,
        newSelectCity: any,
        newSelectDistrict: any,
        newSelectJob: any,
        newSelectExp: any,
        newSelectSalary: any,
        newSelectLevel: any,
        newSelectWorkForm: any,
        newIsSearch: any = true
    ) => {
        set({ keyword: newKeyword });
        set({ selectCity: newSelectCity });
        set({ selectDistrict: newSelectDistrict });
        set({ selectJob: newSelectJob });
        set({ selectExp: newSelectExp });
        set({ selectSalary: newSelectSalary });
        set({ selectLevel: newSelectLevel });
        set({ selectWorkForm: newSelectWorkForm });
        set({ isSearch: newIsSearch });
    }
}));
