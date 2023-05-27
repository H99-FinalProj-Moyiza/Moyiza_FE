import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import BodyContainer from "../component/BodyContainer";
import ClubCard from "../component/ClubCard";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
// import ReviewCard from "../component/ReviewCard";
import CreateClub from "./CreateClub";
import { getAPI } from "../axios";
import SearchBar from "../component/SearchBar";
import { useRecoilState } from "recoil";
import Loading from "../component/Loading";
import { isLoadingState } from "../states/clubState";
const tabs = [
  "전체",
  "문화・예술",
  "운동・액티비티",
  "푸드・드링크",
  "취미",
  "여행・동행",
  "성장・자기계발",
  "동네・또래",
  "연애・소개팅",
];

function Club() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(0);
  const [club, setClub] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  //클럽 목록을 받아오는 코드
  useEffect(() => {
    setIsLoading(true)
    getAPI(`/club?page=${page}&size=8&sort=createdAt,DESC`).then((res) => {
      setClub([...club, ...res.data.content]);
    });
    getAPI("/club").then((res) => setTotalPages(res.data.totalPages));
    setIsLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  //카테고리에 따라 검색하는 코드
  const handleClubCategory = (e) => {
    console.log(e.target.innerHTML);
    getAPI(`/club/search?q=${search}&category=여행`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.change);
  };

  console.log(club);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div ref={divRef} >
        <Container>
          <Navbar />
          <section className="h-auto mt-24 mb-10">
            <BodyContainer>
              <body className="flex flex-col">
                {/* <div className="flex justify-end py-4">
         <button className="bg-rose-400 text-white rounded-lg px-2 py-1">
           필터
         </button>
       </div> */}
                <SearchBar
                  handleSearchInput={handleSearchInput}
                  search={search}
                />
                <div className="flex justify-around  my-4">
                  {tabs.map((tab, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        setActiveTab(tab);
                        handleClubCategory(e);
                      }}
                      className={`${
                        activeTab === tab ? "text-white" : "hover:opacity-50"
                      } relative rounded-full px-3 py-1.5 text-sm font-medium text-black outline-2 transition focus-visible:outline`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="active-pill"
                          transition={{ type: "spring", duration: 0.5 }}
                          className="bg-gatherBlue absolute inset-0"
                          style={{
                            borderRadius: 9999,
                          }}
                        />
                      )}
                      <span className="relative text-base z-10 mix-blend">
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {club?.map((item, i) => {
                      return (
                        <ClubCard
                          key={i}
                          title={item.clubTitle}
                          content={item.clubContent}
                          tag={item.clubTag}
                          thumbnail={item.thumbnailUrl}
                          id={item.club_id}
                          maxGroupSize={item.maxGroupSize}
                          nowMemberCount={item.nowMemberCount}
                        />
                      );
                    })}
                  </div>
                </div>
                {totalPages > page + 1 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setPage(page + 1)}
                      className="bg-rose-400 text-white px-3 py-2 rounded-full"
                    >
                      더보기
                    </button>
                  </div>
                )}
              </body>
            </BodyContainer>
          </section>
          <section className="h-auto mb-10">
            <BodyContainer>
              {/* <div>
       <p>후기</p>
     </div>
     <div className="flex flex-1 justify-around">
       <div className="grid grid-cols-2 gap-x-4 gap-y-8">
         <ReviewCard />
         <ReviewCard />
         <ReviewCard />
         <ReviewCard />
       </div>
     </div> */}
              <div className="flex justify-end">
                <div className="fixed z-100 bottom-16 flex justify-center items-center mt-10 bg-rose-400 text-white w-[130px] py-2 rounded-lg">
                  <CreateClub />
                </div>
              </div>
            </BodyContainer>
          </section>
        </Container>
        </div>
      )}
    </>
  );
}

export default Club;
