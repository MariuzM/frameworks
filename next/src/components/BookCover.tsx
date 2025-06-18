'use client'

import { BlobProvider, Document, Font, Page, StyleSheet, Text } from '@react-pdf/renderer'

const TOTAL_WIDTH = (34.67 / 2.54) * 72
const TOTAL_HEIGHT = (25.46 / 2.54) * 72

Font.register({
  family: 'Font',
  src: '/fonts/Fraunces.ttf',
})

export const BookCover = () => {
  const styles = StyleSheet.create({
    main: {
      fontFamily: 'Font',
      fontSize: 100,
      color: 'red',
      backgroundColor: 'blue',
    },
  })

  const BookCoverDocument = () => (
    <Document>
      <Page size={[TOTAL_HEIGHT, TOTAL_WIDTH]} orientation="landscape">
        <Text style={styles.main}>Aasdasda</Text>
      </Page>
    </Document>
  )

  return (
    <BlobProvider document={<BookCoverDocument />}>
      {({ url, loading, error }) => {
        if (loading) return <p>Generating PDF...</p>
        if (error) return <p>Error: {error.message}</p>
        return (
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            onClick={() => window.open(url as string, '_blank')}
          >
            Open Book Cover PDF
          </button>
        )
      }}
    </BlobProvider>
  )
}
