import Header from "@components/header";
import { contentRequest, totalCountRequest } from "@src/api";
import { CardType } from "@src/api/types";
import Pagination from "@src/components/pagination";
import TableCard from "@src/components/table-card";
import { useStateValue } from "@src/pageReducer";
import className from "classnames/bind";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";
import { defaultLimit, defaultPage, refreshRequestWrapper } from "./utils";

const cnb = className.bind(styles);

export default function Table(): React.ReactElement {
  const router = useRouter();
  const stateValue = useStateValue();

  const [cardList, setCardList] = React.useState<CardType[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(defaultPage);

  const queryParams = {
    limit: defaultLimit,
    page
  } as const;

  const access_token = stateValue?.state.access_token;
  const refresh_token = stateValue?.state.refresh_token;
  const tokensNotEmpty = access_token && refresh_token;

  const tokenRefresh = (refresh: string): void =>
    stateValue?.reducer({ type: "REFRESH_TOKEN", payload: refresh });
  const onHeaderClick = (): void => {
    router.push({ pathname: "/login" });
    stateValue?.reducer({ type: "RESET_STORE" });
  };
  const onPageSelect = (pageSelected: number): void => {
    router.push({ pathname: "", query: { page: pageSelected } });
  };

  React.useEffect(() => {
    const pageParsed = Number(router.query?.page);
    if (pageParsed || pageParsed === 0) setPage(pageParsed);
  }, [router.query?.page]);

  React.useEffect(() => {
    if (tokensNotEmpty) {
      refreshRequestWrapper({
        access_token,
        refresh_token,
        tokenRefresh,
        mainRequest: (access) => totalCountRequest(access)
      }).then((resp) => {
        const count = resp?.result?.count;
        if (count) setTotalCount(count);
      });
    }
  }, [refresh_token]);

  React.useEffect(() => {
    if (tokensNotEmpty) {
      refreshRequestWrapper({
        access_token,
        refresh_token,
        tokenRefresh,
        mainRequest: (access) => contentRequest(access, queryParams)
      }).then((resp) => {
        const result = resp?.result;
        if (result) setCardList(result);
      });
    }
  }, [refresh_token, queryParams.page]);

  return (
    <>
      <Head>
        <title>Table</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header username={stateValue?.state.userEmail} onUserClick={onHeaderClick} />
      <main className={cnb("tableContentWrapper")}>
        {Array.isArray(cardList) &&
          cardList.map((item) => (
            <TableCard key={item._id} category={item.category} name={item.name} />
          ))}
      </main>
      <Pagination
        setPage={onPageSelect}
        totalCount={totalCount}
        limit={queryParams.limit ?? defaultLimit}
        page={queryParams.page ?? defaultPage}
      />
    </>
  );
}
