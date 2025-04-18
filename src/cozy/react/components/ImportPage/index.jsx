import React, { useState, useRef } from 'react'
import { withVaultClient } from 'cozy-keys-lib'
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n"
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import VerticallyCentered from '../VerticallyCentered'
import Wrapper from '../Wrapper'
import Label from 'cozy-ui/transpiled/react/Label'
import Button from "cozy-ui/transpiled/react/Buttons"
import Modal, {
  ModalDescription,
  ModalHeader
} from "cozy-ui/transpiled/react/deprecated/Modal"
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import ImportOptionsField from './ImportOptionsField'
import { getFileContent } from './helpers'
import logger from '../../logger'
import flag from 'cozy-flags'
import useBreakpoints from "cozy-ui/transpiled/react/providers/Breakpoints"

const ImportPage = ({ vaultClient }) => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
  const [selectedFormat, setSelectedFormat] = useState()
  const [importStatus, setImportStatus] = useState('waiting')
  const [importResult, setImportResult] = useState(null)
  const fileInput = useRef(null)

  const importFile = async () => {
    let fileContent
    try {
      fileContent = await getFileContent(fileInput.current.files[0])
    } catch (err) {
      setImportStatus('errored')
      logger.error(err)
      return
    }
    try {
      const res = await vaultClient.import(fileContent, selectedFormat.value)
      setImportResult(res)
      setImportStatus('imported')
    } catch (err) {
      setImportStatus('errored')
      return
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setImportStatus('importing')
    setImportResult(null)

    const isLocked = await vaultClient.isLocked()

    if (!isLocked) {
      await importFile()
    }
  }

  const reloadPage = () => {
    setImportStatus('waiting')
  }

  if (!vaultClient) return null

  return (
    <>
      <VerticallyCentered>
        <Wrapper>
          <Stack spacing="l">
            {!isMobile ? <Typography variant="h3" component="h1">{t('ImportPage.title')}</Typography> : null}
            <form onSubmit={handleSubmit}>
              <ImportOptionsField
                vaultClient={vaultClient}
                value={selectedFormat}
                onChange={setSelectedFormat}
                label={t('ImportPage.options.label')}
                placeholder={t('ImportPage.options.placeholder')}
              />
              <Label htmlFor="file">{t('ImportPage.file.label')}</Label>
              <input type="file" ref={fileInput} id="file" />
              <Button
                type="submit"
                label={t('ImportPage.submit')}
                className="u-mt-1 u-w-100"
              />
            </form>
          </Stack>
        </Wrapper>
      </VerticallyCentered>
      {importStatus !== 'waiting' ? (
        <Modal closable={false}>
          <ModalHeader>
            <Typography variant="h3" component="h1">
              {importStatus === 'importing'
                ? t('ImportPage.modal.importing.title')
                : null}
              {importStatus === 'imported'
                ? t('ImportPage.modal.imported.title')
                : null}
              {importStatus === 'errored'
                ? t('ImportPage.modal.errored.title')
                : null}
            </Typography>
          </ModalHeader>
          <ModalDescription>
              {importStatus === 'importing' ? (
                <div className="u-flex">
                  <Spinner size="xxlarge" className="u-mh-auto" />
                </div>
              ) : null}
              {flag('passwords.debug') && importResult ? (
                <pre>{JSON.stringify(importResult, null, 2)}</pre>
              ) : null}
              {importStatus === 'imported' ? (
                <p>{t('ImportPage.modal.imported.content')}</p>
              ) : null}
              {importStatus === 'errored' ? (
                <p>{t('ImportPage.modal.errored.content')}</p>
              ) : null}
              {importStatus === 'imported' || importStatus === 'errored' ? (
                <Button
                  onClick={reloadPage}
                  label={t('ImportPage.modal.close')}
                  className="u-w-100"
                />
              ) : null}
          </ModalDescription>
        </Modal>
      ) : null}
    </>
  )
}

export default withVaultClient(ImportPage)
