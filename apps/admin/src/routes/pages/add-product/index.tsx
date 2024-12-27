import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { useState } from "react";

type ProductOptionGroup = {
  groupName: string;
  options: string;
};

type ProductOption = {
  optionGroups: {
    name: string;
    value: string;
  }[];
  normalPrice: number;
  salePrice: number;
  stock: number;
};

function getOptionGroupValues(optionGroupValues: string[][]): string[][] {
  if (optionGroupValues.length === 0) {
    return [];
  }
  const [firstGroupValues, ...restGroupValues] = optionGroupValues;
  if (restGroupValues.length === 0) {
    return firstGroupValues.map((value) => [value]);
  }
  const restOptionGroupValues = getOptionGroupValues(restGroupValues);
  const optionGroupValuesCombinations: string[][] = [];
  firstGroupValues.forEach((firstGroupValue) => {
    restOptionGroupValues.forEach((restOptionGroupValue) => {
      optionGroupValuesCombinations.push([
        firstGroupValue,
        ...restOptionGroupValue,
      ]);
    });
  });
  return optionGroupValuesCombinations;
}

function generateOptionCombinations(
  optionGroups: ProductOptionGroup[]
): ProductOption[] {
  const optionCombinations: ProductOption[] = [];
  const optionGroupNames = optionGroups.map((group) => group.groupName);
  const optionGroupValues = optionGroups.map((group) =>
    group.options.split(",")
  );
  const productOptionGroupValues = getOptionGroupValues(optionGroupValues);
  productOptionGroupValues.forEach((optionGroupValues) => {
    const option: ProductOption = {
      optionGroups: optionGroupNames.map((name, index) => ({
        name,
        value: optionGroupValues[index],
      })),
      normalPrice: 0,
      salePrice: 0,
      stock: 0,
    };
    optionCombinations.push(option);
  });
  return optionCombinations;
}

export default function AddProductPage() {
  const [productOptionGroups, setProductOptionGroups] = useState<
    ProductOptionGroup[]
  >([
    {
      groupName: "",
      options: "",
    },
  ]);
  const [optionCombinations, setOptionCombinations] = useState<ProductOption[]>(
    []
  );

  return (
    <div>
      <h1>상품 추가하기</h1>

      <form>
        {/* 상품 기본 정보 입력 영역 */}
        <ProductFormSection title="상품 기본 정보">
          <div>
            <Label>
              상품명
              <Input type="text" />
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-4  mt-4">
            <Label>
              브랜드명
              <Input type="text" />
            </Label>
            <Label>
              모델명
              <Input type="text" />
            </Label>
          </div>
        </ProductFormSection>
        {/* 상품 카테고리 선택 영역 */}
        <ProductFormSection title="상품 카테고리">
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="1차 카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="2차 카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ProductFormSection>
        {/* 상품 이미지 업로드 영역 */}
        <ProductFormSection title="상품 이미지">
          <div>
            <Label>
              이미지 업로드
              <input type="file" />
            </Label>
          </div>
        </ProductFormSection>
        {/* 상품 옵션 설정 영역 */}

        <ProductFormSection title="상품 옵션">
          <RadioGroup defaultValue="single" className="flex">
            <div className="flex items-center">
              <RadioGroupItem id="single" value="single" />
              <Label htmlFor="single">단일 옵션</Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem id="multiple" value="multiple" />
              <Label htmlFor="multiple">복수 옵션</Label>
            </div>
          </RadioGroup>
          {productOptionGroups.map((group, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <Label>
                옵션 그룹명
                <Input
                  type="text"
                  value={group.groupName}
                  onChange={(e) => {
                    const newOptionGroups = [...productOptionGroups];
                    newOptionGroups[index].groupName = e.target.value;
                    setProductOptionGroups(newOptionGroups);
                  }}
                />
              </Label>
              <Label>
                옵션
                <Input
                  type="text"
                  value={group.options}
                  onChange={(e) => {
                    const newOptionGroups = [...productOptionGroups];
                    newOptionGroups[index].options = e.target.value;
                    setProductOptionGroups(newOptionGroups);
                  }}
                />
              </Label>
            </div>
          ))}
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setProductOptionGroups([
                ...productOptionGroups,
                {
                  groupName: "",
                  options: "",
                },
              ]);
            }}
          >
            옵션 추가하기
          </Button>
          <div>
            <Button
              type="button"
              onClick={() => {
                const newOptionCombinations =
                  generateOptionCombinations(productOptionGroups);
                setOptionCombinations(newOptionCombinations);
              }}
            >
              옵션 목록에 적용
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-semibold">옵션 목록</h2>
            <div>
              <Button variant="secondary" type="button">
                옵션 삭제
              </Button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <input type="checkbox" />
                {optionCombinations[0]?.optionGroups.map((group, index) => (
                  <th key={index}>{group.name}</th>
                ))}
                <th>
                  <span>정산가격</span>
                  <Button size="sm" variant="outline" type="button">
                    일괄 적용
                  </Button>
                </th>
                <th>
                  <span>판매가격</span>
                  <Button size="sm" variant="outline" type="button">
                    일괄 적용
                  </Button>
                </th>
                <th>
                  <span>재고</span>
                  <Button size="sm" variant="outline" type="button">
                    일괄 적용
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {optionCombinations.map((option, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>

                  {option.optionGroups.map((group) => (
                    <td key={group.name}>{group.value}</td>
                  ))}

                  <td>
                    <Input
                      type="number"
                      value={option.normalPrice}
                      onChange={(e) => {
                        const newOptionCombinations = [...optionCombinations];
                        newOptionCombinations[index].normalPrice = Number(
                          e.target.value
                        );
                        setOptionCombinations(newOptionCombinations);
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={option.salePrice}
                      onChange={(e) => {
                        const newOptionCombinations = [...optionCombinations];
                        newOptionCombinations[index].salePrice = Number(
                          e.target.value
                        );
                        setOptionCombinations(newOptionCombinations);
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={option.stock}
                      onChange={(e) => {
                        const newOptionCombinations = [...optionCombinations];
                        newOptionCombinations[index].stock = Number(
                          e.target.value
                        );
                        setOptionCombinations(newOptionCombinations);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductFormSection>
        <div className="flex justify-end mt-4">
          <Button type="submit">상품 추가하기</Button>
        </div>
      </form>
    </div>
  );
}

function ProductFormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-4 bg-zinc-100 rounded-lg m-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
