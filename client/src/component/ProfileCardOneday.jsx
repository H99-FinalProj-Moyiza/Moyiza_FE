import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileCardOneday({
    onedayId,
    onedayTitle,
    onedayContent,
    onedayTag,
    onedayGroupSize,
    onedayLocation,
    imageUrlList,
    onedayAttendantsNum,
    thumbnailUrl
    
}) {
    const navigate = useNavigate();
    console.log('onedayTag',onedayTag);
    
    return (
        <>
            <div
                onClick={() => navigate(`/oneday/${onedayId}`)}
                className="cursor-pointer rounded-[18px] flex w-[360px] border border-[#E8E8E8] rounded-xl h-[175px] items-center mb-[16px] bg-white "
            
            >
                <div className="flex items-center rounded-xl ">
                    <img
                        className="rounded-[15px] w-[130px] h-[130px] border-[1px] ml-5 aspect-square object-cover"
                        src={imageUrlList.length > 0 ? imageUrlList[0] : `${process.env.PUBLIC_URL}/images/favicon.png`}
                        alt="clubThumbnail"
                    />
                </div>

                <div className="w-[172px] h-[130px] ml-[20px] flex justify-start flex-col">
                    <div className="flex justify-between">
                        <div className="text-[12px] text-orange-400 mb-[12px] w-[240px] flex ">
                            {onedayTag && onedayTag.map((tag) => {
                                return (
                                    <div
                                        key={tag}
                                        className="rounded-[50px] mb-[15px] mr-1 b-1 border-1 px-2 bg-orange-400 text-white flex justify-start align-center">
                                        {tag}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-[160px] h-[60px] truncate hover:text-clip text-[20px] font-bold">
                        {onedayTitle}
                    </div>
                    <div className="flex justify-between">
                    <div className="text-[14px] flex items-center text-[#747474] truncate hover:text-clip">
                            <img
                                className="w-[21px] h-[21px] mr-[2px]"
                                src={`${process.env.PUBLIC_URL}/images/location.svg`}
                                alt="location"
                            />
                            {onedayLocation}
                        </div>
                        
                        <div className="text-[14px] flex items-center text-[#747474]">
                            <img
                                className="w-[14px] h-[14px] mr-[5px]"
                                src={`${process.env.PUBLIC_URL}/images/count.svg`}
                                alt="count"
                            />
                            {onedayAttendantsNum}/{onedayGroupSize}
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    );
}

export default ProfileCardOneday;
