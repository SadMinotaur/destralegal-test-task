import Header from "@components/header";
import { contentRequest, totalCountRequest } from "@src/api";
import { CardType, ContentRequestParams } from "@src/api/types";
import TableCard from "@src/components/table-card";
import { useStateValue } from "@src/pageReducer";
import usePagination from "@src/utils/usePagination";
import className from "classnames/bind";
import Head from "next/head";
import React from "react";
import styles from "./styles.module.scss";
import { refreshRequestWrapper } from "./utils";

const cnb = className.bind(styles);
const defaultLimit = 10;
const defaultPage = 0;

export default function Table(): React.ReactElement {
  const stateValue = useStateValue();

  const [queryParams, setQueryParams] = React.useState<ContentRequestParams>({
    limit: defaultLimit,
    page: defaultPage
  });
  const [cardList, setCardList] = React.useState<CardType[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  // const pagination = usePagination({
  //   limit: queryParams.limit ?? defaultLimit,
  //   page: queryParams.page ?? defaultPage,
  //   totalCount
  // });

  const access_token = stateValue?.state.access_token;
  const refresh_token = stateValue?.state.refresh_token;
  const tokentsNotEmpty = access_token && refresh_token;

  const tokenRequest = (refresh: string) =>
    stateValue?.reducer({ type: "REFRESH_TOKEN", payload: refresh });

  React.useEffect(() => {
    if (tokentsNotEmpty) {
      refreshRequestWrapper({
        access_token,
        refresh_token,
        tokenRequest,
        mainRequest: (access) => totalCountRequest(access)
      }).then((resp) => {
        const count = resp?.result?.count;
        if (count) setTotalCount(count);
      });
    }
  }, [refresh_token]);

  React.useEffect(() => {
    if (tokentsNotEmpty) {
      refreshRequestWrapper({
        access_token,
        refresh_token,
        tokenRequest,
        mainRequest: (access) => contentRequest(access, queryParams)
      }).then((resp) => {
        const result = resp?.result;
        if (result) setCardList(result);
      });
    }
  }, [refresh_token, queryParams]);

  return (
    <>
      <Head>
        <title>Table</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header username={stateValue?.state.userEmail} />
      <main className={cnb("tableContentWrapper")}>
        {cardList.map((item) => (
          <TableCard key={item._id} category={item.category} name={item.name} />
        ))}
      </main>
      <footer className={cnb("footerElements")}>
        <label>Всего: {totalCount}</label>
      </footer>
    </>
  );
}
