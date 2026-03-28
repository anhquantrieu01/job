import Link from "next/link"

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}:{
  currentPage:number
  totalPages:number
  basePath:string
}){

  return (
    <div className="flex justify-center mt-10 gap-2">

      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage-1}`}
          className="px-3 py-2 border rounded"
        >
          Prev
        </Link>
      )}

      {Array.from({length:totalPages}).map((_,i)=>{

        const page = i+1

        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`px-3 py-2 border rounded
            ${page===currentPage
              ?"bg-black text-white"
              :""
            }`}
          >
            {page}
          </Link>
        )
      })}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage+1}`}
          className="px-3 py-2 border rounded"
        >
          Next
        </Link>
      )}

    </div>
  )
}